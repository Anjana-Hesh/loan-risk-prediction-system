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

    // Applicant Underwriting Vector
    @Column(nullable = false)
    private Double annualIncome;

    @Column(nullable = false)
    private Double debtToIncomeRatio;

    @Column(nullable = false)
    private Integer creditScore;

    @Column(nullable = false)
    private Double loanAmount;

    @Column(nullable = false)
    private Double interestRate;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String maritalStatus;

    @Column(nullable = false)
    private String educationLevel;

    @Column(nullable = false)
    private String employmentStatus;

    @Column(nullable = false)
    private String loanPurpose;

    @Column(nullable = false)
    private String gradeSubgrade;

    // Underwriting Decision Outputs
    private Integer predictionVerdict; // 0 = Approved, 1 = Rejected
    private Double riskProbability;
    private Double confidenceScore;
    private String assignedModel;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}