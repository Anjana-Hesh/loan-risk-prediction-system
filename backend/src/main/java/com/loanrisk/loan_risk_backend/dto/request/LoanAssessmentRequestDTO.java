package com.loanrisk.loan_risk_backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanAssessmentRequestDTO {

    @NotNull(message = "Annual income is required")
    @Positive(message = "Annual income must be positive")
    private Double annual_income;

    @NotNull(message = "Debt-to-income ratio is required")
    @DecimalMin(value = "0.0", message = "DTI cannot be negative")
    @DecimalMax(value = "1.5", message = "DTI exceeds valid threshold")
    private Double debt_to_income_ratio;

    @NotNull(message = "Credit score is required")
    @Min(value = 300, message = "Minimum credit score is 300")
    @Max(value = 850, message = "Maximum credit score is 850")
    private Integer credit_score;

    @NotNull(message = "Loan amount is required")
    @Positive(message = "Loan amount must be positive")
    private Double loan_amount;

    @NotNull(message = "Interest rate is required")
    @Positive(message = "Interest rate must be positive")
    private Double interest_rate;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Marital status is required")
    private String marital_status;

    @NotBlank(message = "Education level is required")
    private String education_level;

    @NotBlank(message = "Employment status is required")
    private String employment_status;

    @NotBlank(message = "Loan purpose is required")
    private String loan_purpose;

    @NotBlank(message = "Grade/Subgrade is required")
    private String grade_subgrade;
}