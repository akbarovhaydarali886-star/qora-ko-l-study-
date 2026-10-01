import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  LogIn, 
  UserPlus, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X,
  ChevronDown,
  User,
  Zap
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView }) => {
  const { 
    currentUser, 
    logout, 
    setAuthModalOpen, 
    setAuthDefaultTab, 
    setAuthDefaultRole,
    demoLogin,
    resetToDefault
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const openAuth = (tab, role = 'student') => {
    setAuthDefaultTab(tab);
    setAuthDefaultRole(role);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'director':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Boshliq (Oybek)
          </span>
        );
      case 'teacher':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <BookOpen className="w-3.5 h-3.5" /> Ustoz
          </span>
        );
      case 'student':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <GraduationCap className="w-3.5 h-3.5" /> O'quvchi
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  QORAKO'L
                </span>
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-600">
                  ZIYO
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                O'quv Markazi & CRM
              </p>
            </div>
          </div>

          {/* Center Navigation (Landing page links) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button 
              onClick={() => setCurrentView('landing')}
              className={`hover:text-blue-600 transition-colors ${currentView === 'landing' ? 'text-blue-600' : ''}`}
            >
              Bosh Sahifa
            </button>
            <a href="#courses" className="hover:text-blue-600 transition-colors">
              Kurslarimiz
            </a>
            <a href="#results" className="hover:text-blue-600 transition-colors">
              Natijalar
            </a>
            <a href="#teachers" className="hover:text-blue-600 transition-colors">
              Ustozlar
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">
              Bog'lanish
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Tezkor Demo Kirish Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-lg transition-colors shadow-xs"
                title="Tizimni sinash uchun tayyor akkauntlar"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Tezkor Demo</span>
                <ChevronDown className="w-3 h-3 text-amber-600" />
              </button>

              {demoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setDemoDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Bir bosishda sinash:
                  </div>
                  <button
                    onClick={() => { demoLogin('director'); setDemoDropdownOpen(false); setCurrentView('crm'); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-amber-50 flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-amber-700">Oybek (Boshliq) 👑</div>
                      <div className="text-[10px] text-slate-500">Premium Boshqaruvchi (oybek / 7788)</div>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Kirish</span>
                  </button>
                  <button
                    onClick={() => { demoLogin('teacher', 't_1'); setDemoDropdownOpen(false); setCurrentView('crm'); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 flex items-center justify-between group border-t border-slate-100"
                  >
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-blue-700">Rustam Mahmudov 👨‍🏫</div>
                      <div className="text-[10px] text-slate-500">Oliy toifali ustoz (Matematika)</div>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Kirish</span>
                  </button>
                  <button
                    onClick={() => { demoLogin('student', 'st_1'); setDemoDropdownOpen(false); setCurrentView('crm'); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 flex items-center justify-between group border-t border-slate-100"
                  >
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-emerald-700">Azizbek Yusupov 🎓</div>
                      <div className="text-[10px] text-slate-500">O'quvchi (1-o'rin, 1250 ball)</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">Kirish</span>
                  </button>
                </div>
              )}
            </div>

            {/* User status yoki Kirish/Ro'yxatdan o'tish */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView(currentView === 'crm' ? 'landing' : 'crm')}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {currentView === 'crm' ? 'Bosh Sahifa' : 'CRM Panelga O\'tish'}
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name}
                    </div>
                    {getRoleBadge(currentUser.role)}
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Chiqish"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Kirish</span>
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/25 transition-all hover:shadow-lg active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Ro'yxatdan O'tish</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-2 md:hidden">
            {currentUser && (
              <button
                onClick={() => setCurrentView(currentView === 'crm' ? 'landing' : 'crm')}
                className="px-2.5 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg"
              >
                {currentView === 'crm' ? 'Sayt' : 'CRM'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Bosh Sahifa
            </button>
            <a 
              href="#courses" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Kurslarimiz
            </a>
            <a 
              href="#results" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Natijalar
            </a>
            <a 
              href="#teachers" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Ustozlar
            </a>
          </nav>

          {/* Demo Mobile */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3">
              Tezkor Demo:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { demoLogin('director'); setMobileMenuOpen(false); setCurrentView('crm'); }}
                className="py-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-center"
              >
                Oybek 👑
              </button>
              <button
                onClick={() => { demoLogin('teacher', 't_1'); setMobileMenuOpen(false); setCurrentView('crm'); }}
                className="py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-center"
              >
                Ustoz 👨‍🏫
              </button>
              <button
                onClick={() => { demoLogin('student', 'st_1'); setMobileMenuOpen(false); setCurrentView('crm'); }}
                className="py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-center"
              >
                O'quvchi 🎓
              </button>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{currentUser.name}</div>
                    {getRoleBadge(currentUser.role)}
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-xs font-bold text-red-600 bg-red-50 rounded-lg text-center flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" /> Chiqish
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl text-center"
                >
                  Kirish
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl text-center shadow-md shadow-blue-500/20"
                >
                  Ro'yxatdan O'tish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
