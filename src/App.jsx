import React from 'react';
import { useApp } from './context/AppContext';
import { LoginPage } from './components/LoginPage';
import { DirectorDashboard } from './components/director/DirectorDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { 
  GraduationCap, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Layers,
  RotateCcw
} from 'lucide-react';

function App() {
  const { currentUser, logout, toastMessage, resetToDefault } = useApp();

  // Agar tizimga kirmagan bo'lsa — BIRINCHI BO'LIB LOGIN & RO'YXATDAN O'TISH SAHIFASI CHIQADI!
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-bold ${
              toastMessage.type === 'error'
                ? 'bg-rose-950 border-rose-800 text-rose-200'
                : toastMessage.type === 'info'
                  ? 'bg-blue-950 border-blue-800 text-blue-200'
                  : 'bg-emerald-950 border-emerald-800 text-emerald-200'
            }`}>
              {toastMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : toastMessage.type === 'info' ? (
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>{toastMessage.message}</span>
            </div>
          </div>
        )}

        <LoginPage />
      </div>
    );
  }

  // Tizimga kirgan foydalanuvchi uchun TO'LIQ KORPORATIV CRM DASHBOARD (To'q ko'k, oq va qora)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-bold ${
            toastMessage.type === 'error'
              ? 'bg-rose-950 border-rose-800 text-rose-200'
              : toastMessage.type === 'info'
                ? 'bg-blue-950 border-blue-800 text-blue-200'
                : 'bg-emerald-950 border-emerald-800 text-emerald-200'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Navbar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white uppercase">
                  QORAKO'L ZIYO
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-1.5 py-0.2 rounded border border-slate-700">
                  CRM
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                {currentUser.role === 'director' 
                  ? "Boshqaruv Paneli (Oybek Rahimov)" 
                  : currentUser.role === 'teacher' 
                    ? "Ustozlar Kabineti" 
                    : "O'quvchi Kabineti"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-right">
                <div className="text-xs font-bold text-white leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {currentUser.role === 'director' ? 'Boshliq 👑' : currentUser.role === 'teacher' ? 'Ustoz 👨‍🏫' : 'O\'quvchi 🎓'}
                </div>
              </div>
            </div>

            {/* Reset */}
            {currentUser.role === 'director' && (
              <button
                onClick={resetToDefault}
                className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                title="Boshlang'ich holatga qaytarish"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Chiqish (Logout) */}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900 rounded-xl text-xs font-bold transition-all"
              title="Tizimdan chiqish"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>

        </header>

        {/* Dashboard Work Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {currentUser.role === 'director' && <DirectorDashboard />}
          {currentUser.role === 'teacher' && <TeacherDashboard />}
          {currentUser.role === 'student' && <StudentDashboard />}
        </main>

        {/* Footer */}
        <footer className="py-4 px-8 border-t border-slate-900 text-center text-xs text-slate-600 font-medium">
          Qorako'l Ziyo Ta'lim Tizimi & CRM Platformasi © {new Date().getFullYear()}
        </footer>

      </div>

    </div>
  );
}

export default App;
