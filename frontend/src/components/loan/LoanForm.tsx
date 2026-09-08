import React, { useState } from 'react';
import type { LoanFormData } from '../../types/loan';
import { Send, RotateCcw, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface LoanFormProps {
  onAssess: (data: LoanFormData) => void;
  loading: boolean;
}

const grades = [
  'A1', 'A2', 'A3', 'A4', 'A5',
  'B1', 'B2', 'B3', 'B4', 'B5',
  'C1', 'C2', 'C3', 'C4', 'C5',
  'D1', 'D2', 'D3', 'D4', 'D5',
  'E1', 'E2', 'E3', 'E4', 'E5',
  'F1', 'F2', 'F3', 'F4', 'F5'
];

const defaultValues: LoanFormData = {
  annual_income: 48000,
  debt_to_income_ratio: 0.12,
  credit_score: 680,
  loan_amount: 15000,
  interest_rate: 12.5,
  gender: 'Female',
  marital_status: 'Single',
  education_level: "Bachelor's",
  employment_status: 'Employed',
  loan_purpose: 'Debt consolidation',
  grade_subgrade: 'C3'
};

export const LoanForm: React.FC<LoanFormProps> = ({ onAssess, loading }) => {
  const [formData, setFormData] = useState<LoanFormData>(defaultValues);
  const [error, setError] = useState<string>('');

  const numericFields = ['annual_income', 'debt_to_income_ratio', 'credit_score', 'loan_amount', 'interest_rate'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.annual_income <= 0 || formData.loan_amount <= 0) {
      setError('Income and Loan Amount must be greater than zero.');
      return;
    }
    if (formData.credit_score < 300 || formData.credit_score > 850) {
      setError('Credit Score must be between 300 and 850.');
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
            setFormData(defaultValues);
            setError('');
          }}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
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
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Requested Loan Amount ($)</label>
            <input
              type="number"
              name="loan_amount"
              value={formData.loan_amount}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Credit Score (300 - 850)</label>
            <input
              type="number"
              name="credit_score"
              value={formData.credit_score}
              onChange={handleChange}
              min="300"
              max="850"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
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
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Debt-to-Income Ratio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Debt-to-Income Ratio</label>
            <input
              type="number"
              step="0.001"
              name="debt_to_income_ratio"
              value={formData.debt_to_income_ratio}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Marital Status</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Education Level</label>
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Employment Status</label>
            <select
              name="employment_status"
              value={formData.employment_status}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {/* Loan Purpose */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Loan Purpose</label>
            <select
              name="loan_purpose"
              value={formData.loan_purpose}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="Debt consolidation">Debt consolidation</option>
              <option value="Car">Car</option>
              <option value="Home">Home</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Medical">Medical</option>
              <option value="Vacation">Vacation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Credit Grade / Subgrade */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Credit Rating Subgrade</label>
            <select
              name="grade_subgrade"
              value={formData.grade_subgrade}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
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