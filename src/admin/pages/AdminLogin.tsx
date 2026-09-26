import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { signInAdmin } from '../../services/dataService';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your admin email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInAdmin(email, password);
      navigate(from, { replace: true });
    } catch {
      setError('Incorrect admin email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5E6] text-[#3A230B] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE897]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#583714]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#FFFDF5] border border-[#E6D39D] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-8 text-left">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden shadow-gold-glow mb-1">
            <img src="/logo.jfif" alt="Taj Tours & Travels" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#3A230B]">
              Taj Tours & Travels
            </h1>
            <p className="text-xs text-[#583714] font-bold uppercase tracking-widest mt-1">
              Admin & CRM Management Portal
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-bold text-[#3A230B] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#583714]" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tajtoursandtravels.com"
              className="w-full px-4 py-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] focus:border-[#583714] text-xs sm:text-sm text-[#3A230B] font-bold placeholder-[#583714]/40 focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-bold text-[#3A230B] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#583714]" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[11px] font-bold text-[#583714] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-[#F7EED3] border border-[#E6D39D] focus:border-[#583714] text-xs sm:text-sm text-[#3A230B] font-bold placeholder-[#583714]/40 focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#583714] hover:text-[#3A230B]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#583714] hover:bg-[#42280C] text-[#FFE897] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all border border-[#FFE897]/40 shimmer-btn cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Verifying...' : 'Enter Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4 text-[#FFE897]" />
          </button>
        </form>

        {/* Security Badge Footnote */}
        <div className="pt-4 border-t border-[#E6D39D] text-center flex items-center justify-center gap-2 text-[11px] text-[#583714] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#583714]" />
          <span>Protected Route • Authorized Staff Only</span>
        </div>

      </div>

      {/* Forgot Password Modal Placeholder */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3A230B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="font-serif text-lg font-bold text-[#3A230B]">Reset Password</h3>
            <p className="text-xs text-[#583714] font-medium leading-relaxed">
              Please contact the senior system administrator or check your registered email recovery desk at <strong className="text-[#3A230B]">tajtoursandtravels9008@gmail.com</strong>.
            </p>
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-bold text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
