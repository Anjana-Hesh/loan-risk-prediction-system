package com.loanrisk.loan_risk_backend.dto.response;

import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanAssessmentResponseDTO {
    private String id;
    private Integer prediction; // 0 or 1
    private Double risk_probability;
    private Double confidence_score;
    private Double debt_to_income_ratio;
    private Double loan_to_income_ratio;
    private String model_name;
    private String timestamp;
    private List<String> risk_factors;
}
