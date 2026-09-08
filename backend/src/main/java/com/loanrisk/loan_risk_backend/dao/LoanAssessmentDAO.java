package com.loanrisk.loan_risk_backend.dao;

import com.loanrisk.loan_risk_backend.entity.LoanAssessment;

import java.util.List;
import java.util.Optional;

public interface LoanAssessmentDAO {
    LoanAssessment save(LoanAssessment assessment);
    List<LoanAssessment> findAllOrderByCreatedAtDesc();
    Optional<LoanAssessment> findById(String id);
}