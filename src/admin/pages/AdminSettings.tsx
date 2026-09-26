import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, Lock, LogOut, CheckCircle2, ShieldCheck, Save } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { updateAdminProfile, setAuthenticated, COMPANY_INFO } from '../../services/dataService';

export const AdminSettings: React.FC = () => {
  const navigate = useNavigate();
  const { adminUser, loading } = useDataStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (adminUser) {
      setName(adminUser.name);
      setEmail(adminUser.email);
    }
  }, [adminUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdminProfile({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/admin/login');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D39D]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3A230B]">
            Admin Account & Business Settings
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Manage your administrator credentials and business configuration.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-900/10 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-red-900 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Session</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Admin profile updated successfully.</span>
        </div>
      )}

      {/* 1. Admin Profile Form */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6D39D] text-[#3A230B]">
          <User className="w-5 h-5 text-[#583714]" />
          <h2 className="font-serif text-lg font-bold">Admin Profile</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Administrator Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#42280C]"
            >
              <Save className="w-4 h-4 text-[#FFE897]" />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Business Info Summary */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6D39D] text-[#3A230B]">
          <Building className="w-5 h-5 text-[#583714]" />
          <h2 className="font-serif text-lg font-bold">Registered Business Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-1">
            <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Business Legal Name</span>
            <span className="font-bold text-[#3A230B] text-sm">{COMPANY_INFO.name}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-1">
            <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Direct Dispatch Hotline</span>
            <span className="font-bold text-[#3A230B] text-sm font-mono">{COMPANY_INFO.phoneDisplay}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-1">
            <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Official Business Email</span>
            <span className="font-bold text-[#3A230B] text-sm">{COMPANY_INFO.email}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] space-y-1">
            <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Operating Dispatch Hours</span>
            <span className="font-bold text-[#3A230B] text-sm">{COMPANY_INFO.operatingHours}</span>
          </div>
        </div>
      </div>

      {/* 3. Password Security */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6D39D] text-[#3A230B]">
          <Lock className="w-5 h-5 text-[#583714]" />
          <h2 className="font-serif text-lg font-bold">Security Credentials</h2>
        </div>

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Admin password changed successfully.</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-bold text-xs uppercase tracking-wider hover:bg-[#42280C]"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
