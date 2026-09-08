package com.loanrisk.loan_risk_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "loan_assessments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private Integer personAge;

    @Column(nullable = false)
    private Double personIncome;

    @Column(nullable = false)
    private String personHomeOwnership;

    @Column(nullable = false)
    private Integer personEmpLength;

    @Column(nullable = false)
    private String loanIntent;

    @Column(nullable = false)
    private Double loanAmnt;

    @Column(nullable = false)
    private Double loanIntRate;

    @Column(nullable = false)
    private Integer cbPersonCredHistLength;

    // Engineered Features & Outcomes
    private Double debtToIncomeRatio;
    private Integer predictionVerdict; // 0 = Low Risk (Approved), 1 = High Risk (Rejected)
    private Double riskProbability;
    private Double confidenceScore;
    private String assignedModel;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
