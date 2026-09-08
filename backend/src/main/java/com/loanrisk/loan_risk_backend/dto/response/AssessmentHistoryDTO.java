package com.loanrisk.loan_risk_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentHistoryDTO {
    private String id;
    private Integer personAge;
    private Double personIncome;
    private String personHomeOwnership;
    private Integer personEmpLength;
    private String loanIntent;
    private Double loanAmnt;
    private Double loanIntRate;
    private Integer cbPersonCredHistLength;
    private Double debtToIncomeRatio;
    private Integer predictionVerdict;
    private Double riskProbability;
    private Double confidenceScore;
    private String assignedModel;
    private LocalDateTime createdAt;
}
