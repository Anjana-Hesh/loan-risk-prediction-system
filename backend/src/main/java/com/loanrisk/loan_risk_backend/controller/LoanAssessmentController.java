package com.loanrisk.loan_risk_backend.controller;

import com.loanrisk.loan_risk_backend.dto.common.ApiResponse;
import com.loanrisk.loan_risk_backend.dto.request.LoanAssessmentRequestDTO;
import com.loanrisk.loan_risk_backend.dto.response.AssessmentHistoryDTO;
import com.loanrisk.loan_risk_backend.dto.response.LoanAssessmentResponseDTO;
import com.loanrisk.loan_risk_backend.service.LoanAssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loan-assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoanAssessmentController {

    private final LoanAssessmentService assessmentService;

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<LoanAssessmentResponseDTO>> evaluateApplicant(
            @Valid @RequestBody LoanAssessmentRequestDTO requestDTO) {
        LoanAssessmentResponseDTO response = assessmentService.evaluateLoanRisk(requestDTO);
        return new ResponseEntity<>(
                new ApiResponse<>(200, "Loan evaluation completed successfully", response),
                HttpStatus.OK
        );
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<AssessmentHistoryDTO>>> fetchAuditHistory() {
        List<AssessmentHistoryDTO> history = assessmentService.getAssessmentHistory();
        return new ResponseEntity<>(
                new ApiResponse<>(200, "Audit history fetched successfully", history),
                HttpStatus.OK
        );
    }
}