package com.loanrisk.loan_risk_backend.util;

public class FinancialCalculatorUtil {

    public static double calculateDebtToIncome(double loanAmount, double annualIncome) {
        if (annualIncome <= 0) return 0.0;
        return Math.round((loanAmount / annualIncome) * 1000.0) / 1000.0;
    }
}
