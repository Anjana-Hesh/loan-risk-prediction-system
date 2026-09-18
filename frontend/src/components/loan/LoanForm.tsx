import React, { useState } from 'react';
import type { LoanFormData } from '../../types/loan';
import { Send, RotateCcw, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface LoanFormProps {
  onAssess: (data: LoanFormData) => void;
  loading: boolean;
}

const emptyValues = {
  annual_income: '',
  debt_to_income_ratio: '',
  credit_score: '',
  loan_amount: '',
  interest_rate: '',
  gender: '',
  marital_status: '',
  education_level: '',
  employment_status: '',
  loan_purpose: '',
  grade_subgrade: ''
} as unknown as LoanFormData;

const grades = [
  'A1', 'A2', 'A3', 'A4', 'A5',
  'B1', 'B2', 'B3', 'B4', 'B5',
  'C1', 'C2', 'C3', 'C4', 'C5',
  'D1', 'D2', 'D3', 'D4', 'D5',
  'E1', 'E2', 'E3', 'E4', 'E5',
  'F1', 'F2', 'F3', 'F4', 'F5'
];

export const LoanForm: React.FC<LoanFormProps> = ({ onAssess, loading }) => {
  const [formData, setFormData] = useState<LoanFormData>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const numericFields = ['annual_income', 'debt_to_income_ratio', 'credit_score', 'loan_amount', 'interest_rate'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear the specific field's error when the user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // 1. Annual Income Validation
    if (String(formData.annual_income) === '' || formData.annual_income <= 0) {
      newErrors.annual_income = 'Income must be greater than $0.';
    }

    // 2. Loan Amount Validation
    if (String(formData.loan_amount) === '' || formData.loan_amount <= 0) {
      newErrors.loan_amount = 'Loan amount must be greater than $0.';
    } else if (formData.loan_amount > formData.annual_income * 10) {
      newErrors.loan_amount = 'Loan amount exceeds reasonable limits based on income.';
    }

    // 3. Credit Score Validation
    if (String(formData.credit_score) === '' || formData.credit_score < 300 || formData.credit_score > 850) {
      newErrors.credit_score = 'Credit Score must be between 300 and 850.';
    }

    // 4. Interest Rate Validation
    if (String(formData.interest_rate) === '' || formData.interest_rate <= 0 || formData.interest_rate > 50) {
      newErrors.interest_rate = 'Interest rate must be between 0.1% and 50%.';
    }

    // 5. Debt-to-Income Validation
    if (String(formData.debt_to_income_ratio) === '' || formData.debt_to_income_ratio < 0 || formData.debt_to_income_ratio >= 1) {
      newErrors.debt_to_income_ratio = 'DTI ratio must be a valid percentage between 0 and 1 (e.g., 0.12).';
    }

    // 6. Dropdowns Validation
    if (!formData.gender) newErrors.gender = 'Please select a gender.';
    if (!formData.marital_status) newErrors.marital_status = 'Please select a marital status.';
    if (!formData.education_level) newErrors.education_level = 'Please select an education level.';
    if (!formData.employment_status) newErrors.employment_status = 'Please select an employment status.';
    if (!formData.loan_purpose) newErrors.loan_purpose = 'Please select a loan purpose.';
    if (!formData.grade_subgrade) newErrors.grade_subgrade = 'Please select a credit grade.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAssess(formData);
  };

  return (
    <GlassCard>
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Applicant Underwriting Vector</h2>
          <p className="text-xs text-slate-400">Institutional credit parameters for automated risk underwriting</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormData(emptyValues);
            setErrors({});
          }}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 transition"
        >
          <RotateCcw className="w-3 h-3" /> Clear All
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Annual Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Annual Income ($)</label>
            <input
              type="number"
              name="annual_income"
              value={formData.annual_income}
              onChange={handleChange}
              placeholder="e.g. 65000"
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${errors.annual_income ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            />
            {errors.annual_income && <p className="text-[10px] text-rose-400 mt-1">{errors.annual_income}</p>}
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Requested Loan Amount ($)</label>
            <input
              type="number"
              name="loan_amount"
              value={formData.loan_amount}
              onChange={handleChange}
              placeholder="e.g. 15000"
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${errors.loan_amount ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            />
            {errors.loan_amount && <p className="text-[10px] text-rose-400 mt-1">{errors.loan_amount}</p>}
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Credit Score (300 - 850)</label>
            <input
              type="number"
              name="credit_score"
              value={formData.credit_score}
              onChange={handleChange}
              placeholder="e.g. 720"
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${errors.credit_score ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            />
            {errors.credit_score && <p className="text-[10px] text-rose-400 mt-1">{errors.credit_score}</p>}
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="interest_rate"
              value={formData.interest_rate}
              onChange={handleChange}
              placeholder="e.g. 10.5"
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${errors.interest_rate ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            />
            {errors.interest_rate && <p className="text-[10px] text-rose-400 mt-1">{errors.interest_rate}</p>}
          </div>

          {/* Debt-to-Income Ratio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Debt-to-Income Ratio (0 to 1)</label>
            <input
              type="number"
              step="0.001"
              name="debt_to_income_ratio"
              value={formData.debt_to_income_ratio}
              onChange={handleChange}
              placeholder="e.g. 0.15"
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition ${errors.debt_to_income_ratio ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            />
            {errors.debt_to_income_ratio && <p className="text-[10px] text-rose-400 mt-1">{errors.debt_to_income_ratio}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none transition ${errors.gender ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            >
              <option value="" disabled>Select Gender...</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-[10px] text-rose-400 mt-1">{errors.gender}</p>}
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Marital Status</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none transition ${errors.marital_status ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            >
              <option value="" disabled>Select Status...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.marital_status && <p className="text-[10px] text-rose-400 mt-1">{errors.marital_status}</p>}
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Education Level</label>
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none transition ${errors.education_level ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            >
              <option value="" disabled>Select Education...</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
            {errors.education_level && <p className="text-[10px] text-rose-400 mt-1">{errors.education_level}</p>}
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Employment Status</label>
            <select
              name="employment_status"
              value={formData.employment_status}
              onChange={handleChange}
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none transition ${errors.employment_status ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            >
              <option value="" disabled>Select Employment...</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student</option>
            </select>
            {errors.employment_status && <p className="text-[10px] text-rose-400 mt-1">{errors.employment_status}</p>}
          </div>

          {/* Loan Purpose */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Loan Purpose</label>
            <select
              name="loan_purpose"
              value={formData.loan_purpose}
              onChange={handleChange}
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none transition ${errors.loan_purpose ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            >
              <option value="" disabled>Select Purpose...</option>
              <option value="Debt consolidation">Debt consolidation</option>
              <option value="Car">Car</option>
              <option value="Home">Home</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Medical">Medical</option>
              <option value="Vacation">Vacation</option>
              <option value="Other">Other</option>
            </select>
            {errors.loan_purpose && <p className="text-[10px] text-rose-400 mt-1">{errors.loan_purpose}</p>}
          </div>

          {/* Credit Grade / Subgrade */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Credit Rating Subgrade</label>
            <select
              name="grade_subgrade"
              value={formData.grade_subgrade}
              onChange={handleChange}
              className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none transition ${errors.grade_subgrade ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'}`}
            >
              <option value="" disabled>Select Grade...</option>
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.grade_subgrade && <p className="text-[10px] text-rose-400 mt-1">{errors.grade_subgrade}</p>}
          </div>

        </div>

        {/* General Form Error Message */}
        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Please fill in all required fields correctly.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Evaluating Underwriting Parameters...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" /> Run Automated Assessment
            </>
          )}
        </button>
      </form>
    </GlassCard>
  );
};