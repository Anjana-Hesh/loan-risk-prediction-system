package com.loanrisk.loan_risk_backend.service;

import com.loanrisk.loan_risk_backend.dto.request.LoanAssessmentRequestDTO;
import com.loanrisk.loan_risk_backend.dto.response.AssessmentHistoryDTO;
import com.loanrisk.loan_risk_backend.dto.response.LoanAssessmentResponseDTO;

import java.util.List;

public interface LoanAssessmentService {
    LoanAssessmentResponseDTO evaluateLoanRisk(LoanAssessmentRequestDTO requestDTO);
    List<AssessmentHistoryDTO> getAssessmentHistory();
}