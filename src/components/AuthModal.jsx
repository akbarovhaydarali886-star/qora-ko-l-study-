import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  UserCheck, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  Phone, 
  User, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authDefaultTab, 
    authDefaultRole, 
    login, 
    register, 
    groups 
  } = useApp();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'teacher' | 'director'
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('+998 ');
  const [regParentPhone, setRegParentPhone] = useState('+998 ');
  const [regSubject, setRegSubject] = useState('Matematika');
  const [regGroupId, setRegGroupId] = useState('');
  const [regExperience, setRegExperience] = useState('3 yil');
  const [regPassword, setRegPassword] = useState('');

  useEffect(() => {
    setActiveTab(authDefaultTab);
    setSelectedRole(authDefaultRole);
    if (authDefaultRole === 'director') {
      setLoginUsername('oybek');
      setLoginPassword('7788');
    } else {
      setLoginUsername('');
      setLoginPassword('');
    }
  }, [authDefaultTab, authDefaultRole, authModalOpen]);

  useEffect(() => {
    if (groups.length > 0 && !regGroupId) {
      setRegGroupId(groups[0].id);
    }
  }, [groups]);

  if (!authModalOpen) return null;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === 'director') {
      setLoginUsername('oybek');
      setLoginPassword('7788');
    } else if (role === 'teacher') {
      setLoginUsername('rustam_ustoz');
      setLoginPassword('123456');
    } else {
      setLoginUsername('azizbek');
      setLoginPassword('123456');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginUsername, loginPassword, selectedRole);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register({
      role: selectedRole,
      name: regName,
      phone: regPhone,
      parentPhone: regParentPhone,
      subject: regSubject,
      groupId: regGroupId,
      experience: regExperience,
      password: regPassword
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 text-white relative">
          <button 
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Qorako'l Ziyo Ta'lim
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            {activeTab === 'login' ? 'Tizimga Kirish' : 'Ro\'yxatdan O\'tish'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {activeTab === 'login' 
              ? 'Ustoz, o\'quvchi yoki markaz boshlig\'i sifatida kiring'
              : 'Qorako\'l o\'quv markazi oilasiga qo\'shiling'}
          </p>

          {/* Tab Selector */}
          <div className="flex bg-white/10 p-1 rounded-xl mt-5">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              Kirish (Login)
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              Ro'yxatdan O'tish
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          
          {/* Role selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Kim sifatida {activeTab === 'login' ? 'kirmoqchisiz' : 'ro\'yxatdan o\'tmoqchisiz'}?
            </label>
            <div className={`grid ${activeTab === 'login' ? 'grid-cols-3' : 'grid-cols-2'} gap-2.5`}>
              
              {/* O'quvchi */}
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'student'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedRole === 'student' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  {selectedRole === 'student' && <UserCheck className="w-4 h-4 text-emerald-600" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">O'quvchi</div>
                  <div className="text-[10px] text-slate-500 leading-tight">Darslar & ballar</div>
                </div>
              </button>

              {/* Ustoz */}
              <button
                type="button"
                onClick={() => handleRoleChange('teacher')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'teacher'
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedRole === 'teacher' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  {selectedRole === 'teacher' && <UserCheck className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ustoz</div>
                  <div className="text-[10px] text-slate-500 leading-tight">Guruh & baholar</div>
                </div>
              </button>

              {/* Rahbar / Boshliq (faqat kirishda) */}
              {activeTab === 'login' && (
                <button
                  type="button"
                  onClick={() => handleRoleChange('director')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                    selectedRole === 'director'
                      ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-500'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      selectedRole === 'director' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    {selectedRole === 'director' && <span className="text-[10px] font-black text-amber-600">👑</span>}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      Oybek <span>👑</span>
                    </div>
                    <div className="text-[10px] text-amber-700 font-semibold leading-tight">Markaz Boshlig'i</div>
                  </div>
                </button>
              )}

            </div>
          </div>

          {/* Form */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {selectedRole === 'director' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Premium Boshqaruvchi:</span> Login: <code className="bg-amber-200/80 px-1 rounded font-mono font-bold">oybek</code>, Parol: <code className="bg-amber-200/80 px-1 rounded font-mono font-bold">7788</code>. Markazdagi barcha ustozlar, guruhlar, to'lovlar va o'quvchilarni nazorat qilish huquqiga ega.
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {selectedRole === 'director' ? 'Boshliq Logini' : 'Login yoki Telefon raqam'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder={
                      selectedRole === 'director' 
                        ? 'oybek' 
                        : selectedRole === 'teacher' 
                          ? 'rustam_ustoz yoki telefon' 
                          : 'azizbek yoki telefon'
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Parol
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group mt-2"
              >
                <span>Tizimga Kirish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  To'liq Ism-familiyangiz
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Masalan: Sardor Aliyev"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon raqam
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
                  />
                </div>

                {selectedRole === 'student' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ota-ona telefoni
                    </label>
                    <input
                      type="tel"
                      value={regParentPhone}
                      onChange={(e) => setRegParentPhone(e.target.value)}
                      placeholder="+998 90 987 65 43"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ish staji / Tajriba
                    </label>
                    <input
                      type="text"
                      value={regExperience}
                      onChange={(e) => setRegExperience(e.target.value)}
                      placeholder="5 yil"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
                    />
                  </div>
                )}
              </div>

              {selectedRole === 'student' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Qaysi guruhga yozilasiz?
                  </label>
                  <select
                    value={regGroupId}
                    onChange={(e) => setRegGroupId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mutaxassislik fani
                  </label>
                  <input
                    type="text"
                    value={regSubject}
                    onChange={(e) => setRegSubject(e.target.value)}
                    placeholder="Matematika, Fizika, IELTS..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parol yarating
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group mt-2"
              >
                <span>Ro'yxatdan O'tishni Yakunlash</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
