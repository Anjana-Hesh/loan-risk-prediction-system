package com.loanrisk.loan_risk_backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanAssessmentRequestDTO {

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Minimum age is 18")
    @Max(value = 100, message = "Invalid age")
    private Integer person_age;

    @NotNull(message = "Annual income is required")
    @Positive(message = "Income must be positive")
    private Double person_income;

    @NotBlank(message = "Home ownership is required")
    private String person_home_ownership;

    @NotNull(message = "Employment length is required")
    @Min(value = 0, message = "Employment length cannot be negative")
    private Integer person_emp_length;

    @NotBlank(message = "Loan intent is required")
    private String loan_intent;

    @NotNull(message = "Loan amount is required")
    @Positive(message = "Loan amount must be positive")
    private Double loan_amnt;

    @NotNull(message = "Interest rate is required")
    @Positive(message = "Interest rate must be positive")
    private Double loan_int_rate;

    @NotNull(message = "Credit history length is required")
    @Min(value = 0, message = "Credit history length cannot be negative")
    private Integer cb_person_cred_hist_length;
}
