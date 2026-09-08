package com.loanrisk.loan_risk_backend.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StandardResponse<T> {
    private int status;
    private String message;
    private T data;
}