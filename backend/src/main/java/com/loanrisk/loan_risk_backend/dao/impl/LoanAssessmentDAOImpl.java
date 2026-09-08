package com.loanrisk.loan_risk_backend.dao.impl;

import com.loanrisk.loan_risk_backend.dao.LoanAssessmentDAO;
import com.loanrisk.loan_risk_backend.entity.LoanAssessment;
import com.loanrisk.loan_risk_backend.repository.LoanAssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LoanAssessmentDAOImpl implements LoanAssessmentDAO {

    private final LoanAssessmentRepository repository;

    @Override
    public LoanAssessment save(LoanAssessment assessment) {
        return repository.save(assessment);
    }

    @Override
    public List<LoanAssessment> findAllOrderByCreatedAtDesc() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Optional<LoanAssessment> findById(String id) {
        return repository.findById(id);
    }
}
