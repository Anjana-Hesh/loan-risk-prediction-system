import React from 'react';
import { 
  ShieldAlert, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  GitFork, 
  Cpu, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: 'assessment' | 'history' | 'metrics') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-850 bg-slate-950/90 backdrop-blur-2xl text-slate-400 mt-20 transition-colors">
      {/* Top Banner / Micro-indicator */}
      <div className="border-b border-slate-850/80 py-3 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-emerald-400 font-semibold">TechJitters Core v2.4</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">High-Precision Automated Underwriting Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> XGBoost-FastAPI Inference
            </span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> Spring Boot Gateway
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand / Company Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-wider text-slate-100 uppercase">
                  TechJitters
                </h3>
                <p className="text-[11px] text-cyan-400 font-medium">
                  AI & Intelligent Systems Division
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Delivering enterprise Machine Learning architectures and real-time credit default risk prediction models. Powered by decoupled microservice pipelines and explainable AI algorithms.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Anjana-Hesh/loan-risk-prediction-system"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition shadow-sm"
                title="GitHub Repository"
              >
                <GitFork className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition shadow-sm"
                title="LinkedIn Enterprise"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('assessment')}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  Applicant Assessment
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('history')}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  Audit Logs & History
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('metrics')}
                  className="hover:text-cyan-400 transition flex items-center gap-1.5 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  Model Performance
                </button>
              </li>
              <li>
                <a
                  href="#api-docs"
                  className="hover:text-cyan-400 transition flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  FastAPI OpenAPI Specs
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Model Specifications */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Model Specs
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ensemble: XGBoost</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Engineered Ratios: 6</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Serialization: Joblib</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Payload SLA: &lt; 25ms</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Inquiries */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Corporate Inquiries</span>
                  <a 
                    href="mailto:contact@techjitters.com" 
                    className="text-slate-300 hover:text-cyan-400 transition font-medium"
                  >
                    contact@techjitters.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Operations Hotline</span>
                  <a 
                    href="tel:+94772184920" 
                    className="text-slate-300 hover:text-emerald-400 transition font-mono"
                  >
                    +94 77 218 4920
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">HQ Location</span>
                  <span className="text-slate-300">Colombo / Galle, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-slate-850 py-5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TechJitters Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition">Security Architecture</span>
            <span className="hover:text-slate-400 cursor-pointer transition">Inference Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer transition">REST API SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};