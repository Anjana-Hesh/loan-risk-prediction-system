package com.loanrisk.loan_risk_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MLServicePredictionDTO {
    private Integer prediction;             // 0 = Approved, 1 = Rejected
    private Double probability_risk;        // e.g. 0.16
    private Double confidence_score;        // e.g. 0.94
    private String model_name;             // "XGBoost-V2.1-Ensemble"
    private List<String> key_risk_factors;
}
