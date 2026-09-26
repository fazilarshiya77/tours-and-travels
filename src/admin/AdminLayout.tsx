import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Wrench, 
  Compass, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { signOutAdmin } from '../services/dataService';
import { useDataStore } from '../hooks/useDataStore';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { inquiries } = useDataStore();

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const handleLogout = async () => {
    await signOutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/admin/vehicles', icon: Car },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Tours / Packages', path: '/admin/tours', icon: Compass },
    { 
      name: 'Inquiries', 
      path: '/admin/inquiries', 
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined
    },
    { name: 'Website Content', path: '/admin/content', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5E6] text-[#3A230B] flex flex-col lg:flex-row font-sans">
      
      {/* 1. DESKTOP LEFT SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#3A230B] text-[#FAF5E6] border-r border-[#E6D39D]/30 shrink-0 min-h-screen sticky top-0 justify-between p-5">
        
        <div className="space-y-6">
          {/* Logo & Brand */}
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-2 py-1 group">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-gold-glow group-hover:scale-105 transition-transform shrink-0">
              <img src="/logo.jfif" alt="Taj Tours & Travels" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm font-bold tracking-wide text-[#FFE897] leading-tight">
                TAJ TOURS & TRAVELS
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#FFE897]/70 font-bold">
                Admin CRM Portal
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FFE897] text-[#3A230B] shadow-md font-extrabold'
                        : 'text-[#FAF5E6]/80 hover:bg-[#4A2E12] hover:text-[#FFE897]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-[#3A230B] text-[#FFE897]' : 'bg-[#FFE897] text-[#3A230B]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-[#FFE897]/20 space-y-3 text-left">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#4A2E12] hover:bg-[#583714] text-[#FFE897] text-xs font-bold transition-colors border border-[#FFE897]/20"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* 2. MOBILE TOP BAR */}
      <header className="lg:hidden bg-[#3A230B] text-[#FAF5E6] border-b border-[#E6D39D]/30 px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <img src="/logo.jfif" alt="Taj Tours & Travels" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-sm font-bold text-[#FFE897]">TAJ CRM</span>
        </Link>

        <div className="flex items-center gap-3">
          {newInquiriesCount > 0 && (
            <Link to="/admin/inquiries" className="px-2.5 py-1 rounded-full bg-[#FFE897] text-[#3A230B] text-[10px] font-black">
              {newInquiriesCount} New
            </Link>
          )}
          <button
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            className="p-1.5 text-[#FFE897] hover:text-white"
          >
            {isMobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#3A230B]/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-fade-in text-left">
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#FFE897]/20">
              <span className="font-serif text-lg font-bold text-[#FFE897]">Admin Navigation</span>
              <button onClick={() => setIsMobileDrawerOpen(false)} className="text-[#FFE897]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase ${
                        isActive ? 'bg-[#FFE897] text-[#3A230B]' : 'text-[#FAF5E6]/90 hover:bg-[#4A2E12]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#FFE897] text-[#3A230B]">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#FFE897]/20">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#4A2E12] text-[#FFE897] font-bold text-xs uppercase flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Public Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-red-900/50 text-red-200 font-bold text-xs uppercase flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-x-hidden min-h-screen">
        <Outlet />
      </main>

    </div>
  );
};
