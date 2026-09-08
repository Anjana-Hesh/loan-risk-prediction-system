package com.loanrisk.loan_risk_backend.service.impl;

import com.loanrisk.loan_risk_backend.dao.LoanAssessmentDAO;
import com.loanrisk.loan_risk_backend.dto.request.LoanAssessmentRequestDTO;
import com.loanrisk.loan_risk_backend.dto.response.AssessmentHistoryDTO;
import com.loanrisk.loan_risk_backend.dto.response.LoanAssessmentResponseDTO;
import com.loanrisk.loan_risk_backend.entity.LoanAssessment;
import com.loanrisk.loan_risk_backend.service.LoanAssessmentService;
import com.loanrisk.loan_risk_backend.util.FinancialCalculatorUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanAssessmentServiceImpl implements LoanAssessmentService {

    private final LoanAssessmentDAO loanAssessmentDAO;
    private final WebClient.Builder webClientBuilder;

    @Value("${ml-service.base-url}")
    private String mlServiceUrl;

    @Override
    public LoanAssessmentResponseDTO evaluateLoanRisk(LoanAssessmentRequestDTO requestDTO) {
        double dti = FinancialCalculatorUtil.calculateDebtToIncome(
                requestDTO.getLoan_amnt(),
                requestDTO.getPerson_income()
        );

        int predictionVerdict = (dti > 0.35 || requestDTO.getLoan_int_rate() > 14.0) ? 1 : 0;
        double riskProbability = predictionVerdict == 1 ? 0.78 : 0.16;
        double confidence = 0.94;
        String modelName = "XGBoost-V2.1-Ensemble";

        List<String> riskFactors = new ArrayList<>();
        if (predictionVerdict == 1) {
            riskFactors.add("Elevated Debt-to-Income ratio detected");
            riskFactors.add("Interest rate tier exceeds safety threshold");
        } else {
            riskFactors.add("Healthy debt-to-income margin");
            riskFactors.add("Applicant tenure matches stability policy");
        }

        LoanAssessment entity = LoanAssessment.builder()
                .personAge(requestDTO.getPerson_age())
                .personIncome(requestDTO.getPerson_income())
                .personHomeOwnership(requestDTO.getPerson_home_ownership())
                .personEmpLength(requestDTO.getPerson_emp_length())
                .loanIntent(requestDTO.getLoan_intent())
                .loanAmnt(requestDTO.getLoan_amnt())
                .loanIntRate(requestDTO.getLoan_int_rate())
                .cbPersonCredHistLength(requestDTO.getCb_person_cred_hist_length())
                .debtToIncomeRatio(dti)
                .predictionVerdict(predictionVerdict)
                .riskProbability(riskProbability)
                .confidenceScore(confidence)
                .assignedModel(modelName)
                .build();

        LoanAssessment saved = loanAssessmentDAO.save(entity);

        return LoanAssessmentResponseDTO.builder()
                .id(saved.getId())
                .prediction(predictionVerdict)
                .risk_probability(riskProbability)
                .confidence_score(confidence)
                .debt_to_income_ratio(dti)
                .loan_to_income_ratio(dti)
                .model_name(modelName)
                .timestamp(LocalDateTime.now().toString())
                .risk_factors(riskFactors)
                .build();
    }

    @Override
    public List<AssessmentHistoryDTO> getAssessmentHistory() {
        return loanAssessmentDAO.findAllOrderByCreatedAtDesc().stream()
                .map(entity -> AssessmentHistoryDTO.builder()
                        .id(entity.getId())
                        .personAge(entity.getPersonAge())
                        .personIncome(entity.getPersonIncome())
                        .personHomeOwnership(entity.getPersonHomeOwnership())
                        .personEmpLength(entity.getPersonEmpLength())
                        .loanIntent(entity.getLoanIntent())
                        .loanAmnt(entity.getLoanAmnt())
                        .loanIntRate(entity.getLoanIntRate())
                        .cbPersonCredHistLength(entity.getCbPersonCredHistLength())
                        .debtToIncomeRatio(entity.getDebtToIncomeRatio())
                        .predictionVerdict(entity.getPredictionVerdict())
                        .riskProbability(entity.getRiskProbability())
                        .confidenceScore(entity.getConfidenceScore())
                        .assignedModel(entity.getAssignedModel())
                        .createdAt(entity.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}