package com.loanrisk.loan_risk_backend.repository;

import com.loanrisk.loan_risk_backend.entity.LoanAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanAssessmentRepository extends JpaRepository<LoanAssessment, String> {
    List<LoanAssessment> findAllByOrderByCreatedAtDesc();
}