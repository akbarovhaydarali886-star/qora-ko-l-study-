import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LoginPage = () => {
  const { login, register, groups } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('student'); // 'student' | 'teacher'

  // Login form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Register form inputs
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('+998 ');
  const [regParentPhone, setRegParentPhone] = useState('+998 ');
  const [regCategory, setRegCategory] = useState('Matematika');
  const [regSubject, setRegSubject] = useState('Matematika & Mantiq');
  const [regGroupId, setRegGroupId] = useState(groups[0]?.id || '');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg("Foydalanuvchi nomi yoki loginni kiriting!");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Parolni kiriting!");
      return;
    }

    const res = login(username, password, role);
    if (!res.success) {
      setErrorMsg(res.error || "Login yoki parol noto'g'ri!");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim()) {
      setErrorMsg("To'liq ism-familiyangizni kiriting!");
      return;
    }
    if (!regPhone.trim() || regPhone.length < 9) {
      setErrorMsg("Telefon raqamini to'g'ri kiriting!");
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setErrorMsg("Parol kamida 4 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    const res = register({
      role,
      name: regName,
      phone: regPhone,
      parentPhone: regParentPhone,
      category: regCategory,
      subject: regSubject,
      groupId: regGroupId,
      password: regPassword
    });

    if (!res.success) {
      setErrorMsg("Ro'yxatdan o'tishda xatolik yuz berdi!");
    }
  };

  const fillQuickDemo = (demoUser, demoPass, demoRole) => {
    setMode('login');
    setUsername(demoUser);
    setPassword(demoPass);
    setRole(demoRole);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background subtle dark gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-900/15 via-slate-900/10 to-transparent pointer-events-none rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Top Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase font-['Plus_Jakarta_Sans']">
            Qorako'l Ziyo
          </h1>
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-1">
            Ta'lim Markazi & Boshqaruv Tizimi
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {/* Switch: Kirish / Ro'yxatdan o'tish */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ro'yxatdan O'tish
            </button>
          </div>

          {/* Role Selector: 2 xil usulda — O'quvchi va Ustoz */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Foydalanuvchi Roli:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setRole('student'); setErrorMsg(''); }}
                className={`py-3 px-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  role === 'student'
                    ? 'border-blue-500 bg-blue-950/40 text-white ring-1 ring-blue-500/50'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  role === 'student' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">O'quvchi</div>
                  <div className="text-[10px] text-slate-500">Mavzular & Reyting</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setRole('teacher'); setErrorMsg(''); }}
                className={`py-3 px-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  role === 'teacher'
                    ? 'border-blue-500 bg-blue-950/40 text-white ring-1 ring-blue-500/50'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  role === 'teacher' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Ustoz</div>
                  <div className="text-[10px] text-slate-500">Guruh & Imtihonlar</div>
                </div>
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Foydalanuvchi nomi / Login
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Login yoki telefon raqami"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Parol
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-black tracking-wider uppercase shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Tizimga Kirish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  To'liq Ism-familiyangiz
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Masalan: Sardor Aliyev"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Telefon Raqam
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                  />
                </div>

                {role === 'student' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Ota-ona Telefoni
                    </label>
                    <input
                      type="tel"
                      value={regParentPhone}
                      onChange={(e) => setRegParentPhone(e.target.value)}
                      placeholder="+998 90 987 65 43"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Fan Yo'nalishi
                    </label>
                    <select
                      value={regCategory}
                      onChange={(e) => setRegCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                    >
                      <option value="Matematika">Matematika</option>
                      <option value="Ingliz tili">Ingliz tili</option>
                      <option value="Kimyo">Kimyo</option>
                      <option value="Biologiya">Biologiya</option>
                      <option value="Fizika">Fizika</option>
                    </select>
                  </div>
                )}
              </div>

              {role === 'student' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Guruhni Tanlang
                  </label>
                  <select
                    value={regGroupId}
                    onChange={(e) => setRegGroupId(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.subject})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Ixtisosligi / Dars fani
                  </label>
                  <input
                    type="text"
                    value={regSubject}
                    onChange={(e) => setRegSubject(e.target.value)}
                    placeholder="Masalan: Olimpiada Matematikasi"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Parol Yarating
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Kamida 4 ta belgi"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-black tracking-wider uppercase shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Ro'yxatdan O'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

        {/* Quick Fill / Demo Accounts Help Card */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>Tezkor kirish (Sinash uchun 1 bosish):</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo('oybek', 'oybek1234', 'teacher')}
              className="p-2 rounded-xl bg-slate-950 border border-blue-900/40 hover:border-blue-500 text-left transition-colors group"
            >
              <div className="font-bold text-white group-hover:text-blue-400">Oybek 👑</div>
              <div className="text-[10px] text-slate-400">Boshliq (Admin)</div>
            </button>

            <button
              type="button"
              onClick={() => fillQuickDemo('rustam_mat', '123456', 'teacher')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-colors group"
            >
              <div className="font-bold text-white group-hover:text-blue-400">Rustam 👨‍🏫</div>
              <div className="text-[10px] text-slate-400">Ustoz (Matematika)</div>
            </button>

            <button
              type="button"
              onClick={() => fillQuickDemo('azizbek', '123456', 'student')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-left transition-colors group"
            >
              <div className="font-bold text-white group-hover:text-blue-400">Azizbek 🎓</div>
              <div className="text-[10px] text-slate-400">O'quvchi (1-o'rin)</div>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
