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
    private Double annualIncome;
    private Double debtToIncomeRatio;
    private Integer creditScore;
    private Double loanAmount;
    private Double interestRate;
    private String gender;
    private String maritalStatus;
    private String educationLevel;
    private String employmentStatus;
    private String loanPurpose;
    private String gradeSubgrade;
    private Integer predictionVerdict;
    private Double riskProbability;
    private Double confidenceScore;
    private String assignedModel;
    private LocalDateTime createdAt;
}