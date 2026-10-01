import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Zap,
  Target
} from 'lucide-react';

export const LandingPage = ({ onOpenCrm }) => {
  const { setAuthModalOpen, setAuthDefaultTab, setAuthDefaultRole, demoLogin, teachers, groups } = useApp();

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('+998 ');
  const [leadCourse, setLeadCourse] = useState('Prezident Maktabiga Tayyorlov');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
      setLeadName('');
      setLeadPhone('+998 ');
    }, 4000);
  };

  const openAuth = (tab, role) => {
    setAuthDefaultTab(tab);
    setAuthDefaultRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-blue-50/80 via-white to-slate-50">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-400/10 via-indigo-300/10 to-amber-300/10 blur-3xl -z-10 pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Qorako'l Ta'lim Metodologiyasi & CRM Tizimi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Kelajak liderlari <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500">
                  Qorako'l Ziyo
                </span> bilan kamol topadi!
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Prezident maktablari, xalqaro olimpiadalar va nufuzli OTMlarga tayyorgarlik. O'quvchilar va ustozlar uchun integratsiyalashgan zamonaviy <span className="font-semibold text-slate-900">dars jadvali, davomat, ball tizimi va to'lovlar monitoringi CRM</span>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => openAuth('register', 'student')}
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center gap-2.5 text-sm sm:text-base"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>O'quvchi Bo'lib Yozilish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openAuth('login', 'teacher')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border-2 border-slate-200 shadow-sm transition-all flex items-center gap-2.5 text-sm sm:text-base hover:border-slate-300"
                >
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Ustozlar Kabineti</span>
                </button>
              </div>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">98.4%</div>
                  <div className="text-xs text-slate-500 font-medium">OTM talabasi bo'lish</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">150+</div>
                  <div className="text-xs text-slate-500 font-medium">Prezident maktabi</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-black text-amber-500">15+ yil</div>
                  <div className="text-xs text-slate-500 font-medium">Qorako'l tajribasi</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card & Quick Demo Access */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-7 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Header of the Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      CRM
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Qorako'l Platformasi</div>
                      <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Jonli tizim faol
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-800">
                    2024-2025
                  </span>
                </div>

                {/* Interactive role shortcuts in Hero */}
                <div className="mt-5 space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tezkor sinab ko'rish uchun tanlang:
                  </div>

                  {/* Oybek - Director */}
                  <div 
                    onClick={() => { demoLogin('director'); onOpenCrm(); }}
                    className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                        👑
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                          Oybek (Markaz Boshlig'i)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Ustozlar qidiruvi, to'lovlar va to'liq nazorat
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Ustoz */}
                  <div 
                    onClick={() => { demoLogin('teacher', 't_1'); onOpenCrm(); }}
                    className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-100/70 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                        👨‍🏫
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-800">
                          Rustam Mahmudov (Ustoz)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Jadval, mavzular ptichkasi, davomat & ballar
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* O'quvchi */}
                  <div 
                    onClick={() => { demoLogin('student', 'st_1'); onOpenCrm(); }}
                    className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-100/70 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        🎓
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          Azizbek (O'quvchi)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Uy ishlari, sinf reytingi va imtihonlar
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom trust footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Rasmiy kafolatlangan
                  </span>
                  <span className="font-semibold text-slate-700">pass: 7788 (Oybek)</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COURSES SECTION */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Ta'lim Yo'nalishlari
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Prezident va Ixtisoslashtirilgan Maktablarga Tayyorlov
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Har bir kurs chuqurlashtirilgan Qorako'l matematikasi va xalqaro metodlar asosida olib boriladi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Course 1 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-xl hover:border-blue-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  📐
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  Eng Talabgor Kurs
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Prezident Maktabiga Tayyorlov
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Mantiqiy fikrlash (Critical Thinking), muammolarni yechish (Problem Solving) va matematika.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Haftada 3 kun, 2 soatdan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Har hafta sinov testi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cambridge formati</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Oylik to'lov</div>
                  <div className="text-base font-black text-slate-900">650,000 so'm</div>
                </div>
                <button
                  onClick={() => openAuth('register', 'student')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                >
                  Yozilish
                </button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-xl hover:border-amber-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  🏆
                </div>
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                  Olimpiada Darajasi
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Olimpiada Matematikasi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Al-Xorazmiy, Mirzo Ulug'bek va Xalqaro matematika olimpiadalariga maxsus jamoa tayyorlash.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Nostandart yechimlar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dirixle, invariantlar, sonlar nazariyasi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Respublika hakamlari nazorati</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Oylik to'lov</div>
                  <div className="text-base font-black text-slate-900">600,000 so'm</div>
                </div>
                <button
                  onClick={() => openAuth('register', 'student')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600"
                >
                  Yozilish
                </button>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  ⚡
                </div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  Amaliy & Nazariy
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Fundamental Fizika
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  DTM, milliy sertifikat va xalqaro olimpiadalarga tayyorgarlik. Real laboratoriya tajribalari.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kinematika, termodinamika, optika</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Formula yodlash emas, mantiqan tushunish</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Oylik to'lov</div>
                  <div className="text-base font-black text-slate-900">550,000 so'm</div>
                </div>
                <button
                  onClick={() => openAuth('register', 'student')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
                >
                  Yozilish
                </button>
              </div>
            </div>

            {/* Course 4 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-xl hover:border-emerald-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  🇬🇧
                </div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                  Xalqaro Standart
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  IELTS 7.5+ & CEFR
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Speaking klublar, Mock imtihonlar va individual insholar tahlili.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>IELTS 8.5 sertifikatli trener</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Haftalik bepul Mock testlar</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Oylik to'lov</div>
                  <div className="text-base font-black text-slate-900">650,000 so'm</div>
                </div>
                <button
                  onClick={() => openAuth('register', 'student')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  Yozilish
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CRM EXPLANATION SECTION (CRM Imkoniyatlari) */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
              Innovatsion Boshqaruv
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">
              O'quv Markazining Ichki CRM Tizimi
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Har bir dars, davomat, ballar, imtihonlar va oylik to'lovlar shaffof va tartibli nazoratda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Ustozlar uchun */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-7 relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-2xl mb-4 border border-blue-500/30">
                👨‍🏫
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ustozlar Uchun</h3>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Guruhlar & Jadval:</strong> Dars vaqtlari, xonalar va o'quvchilar ro'yxati.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Ptichka tizimi:</strong> O'tilgan dars mavzulari va uy vazifalarini "Bajarildi" deb belgilash.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Elektron Davomat:</strong> Keldi, kelmadi, sababli holatlari.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Ball sistema & Imtihonlar:</strong> Faollik uchun rag'bat ballari berish.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Ustozlar reytingi:</strong> Natijadorlik bo'yicha markaz peshqadamlari orasida o'z o'rni.</span>
                </li>
              </ul>
            </div>

            {/* O'quvchilar uchun */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-7 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-2xl mb-4 border border-emerald-500/30">
                🎓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">O'quvchilar Uchun</h3>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dars jadvali & Uy ishi:</strong> Bugun nima o'tildi va uyga nima vazifa berildi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Mening Ballarim:</strong> To'plangan ballar, unvonlar va rag'batlar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Sinf Reytingi:</strong> Guruhdoshlar orasida 1, 2, 3-o'rinlar ro'yxati.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Imtihonlar Ketma-ketligi:</strong> Keyingi sinov kuni, vaqti va xonasi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>To'lov Holati:</strong> Oylik to'lov to'langanmi yoki qarzdorlik bormi ko'rish.</span>
                </li>
              </ul>
            </div>

            {/* Rahbar (Oybek) uchun */}
            <div className="bg-slate-800/80 border border-amber-500/40 rounded-3xl p-7 relative ring-1 ring-amber-500/30">
              <div className="absolute top-5 right-5 text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Oybek (7788)
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-2xl mb-4 border border-amber-500/30">
                👑
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Markaz Boshlig'i (Oybek)</h3>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Ustozlar Qidiruvi:</strong> Barcha ustozlar ro'yxati, tajribasi va nechta guruhi borligi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Moliya & To'lovlar:</strong> Kimlar to'lagan, kimlarniki kechikmoqda, jami tushum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Kechikkanlarga SMS:</strong> To'lovi o'tganlarga 1 bosish bilan eslatma jo'natish.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>O'tilgan darslar nazorati:</strong> Ustozlar jadvalga amal qilyaptimi, ptichkalar.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => { demoLogin('director'); onOpenCrm(); }}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 transition-all inline-flex items-center gap-2 text-sm"
            >
              <span>Boshliq (Oybek) Sifatida CRM Tizimiga Kirish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. TEACHERS SHOWCASE SECTION */}
      <section id="teachers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Tajribali Mutaxassislar
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Bizning Faxriy Ustozlarimiz
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Har bir ustozimiz ko'p yillik olimpiada va oliy toifali pedagogik tajribaga ega.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map(teacher => {
              const teacherGroups = groups.filter(g => g.teacherId === teacher.id);
              return (
                <div 
                  key={teacher.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-3xl p-5 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative mb-4">
                      <img 
                        src={teacher.avatar} 
                        alt={teacher.name}
                        className="w-full h-48 object-cover rounded-2xl shadow-xs"
                      />
                      <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{teacher.rating} ball</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{teacher.name}</h3>
                    <p className="text-xs font-semibold text-blue-600 mb-2">{teacher.subject}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{teacher.bio}</p>

                    <div className="space-y-1.5 py-2 border-t border-slate-200 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Tajriba:</span>
                        <span className="font-bold text-slate-800">{teacher.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Faol guruhlari:</span>
                        <span className="font-bold text-blue-600">{teacherGroups.length} ta guruh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>O'quvchilar:</span>
                        <span className="font-bold text-slate-800">{teacher.studentsCount} nafar</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { demoLogin('teacher', teacher.id); onOpenCrm(); }}
                    className="w-full mt-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    Profilni ochish
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. REGISTRATION / LEAD FORM */}
      <section id="contact" className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 sm:p-12">
            
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Birinchi Dars Bepul
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Qorako'l Kurslariga Qabulga Yoziling
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Ma'lumotlaringizni qoldiring, administratorlarimiz 15 daqiqada siz bilan bog'lanib, bepul sinov darsiga yozib qo'yishadi.
              </p>
            </div>

            {leadSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Arizangiz muvaffaqiyatli qabul qilindi!</h3>
                <p className="text-xs text-emerald-700">Tez orada operatorimiz sizga qo'ng'iroq qiladi. Rahmat!</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      O'quvchining Ismi
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Masalan: Behruz Olimov"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefon Raqam
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Qiziqqan Yo'nalishingiz
                  </label>
                  <select
                    value={leadCourse}
                    onChange={(e) => setLeadCourse(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  >
                    <option>Prezident Maktabiga Tayyorlov</option>
                    <option>Olimpiada Matematikasi</option>
                    <option>Fundamental Fizika</option>
                    <option>IELTS 7.5+ & Academic English</option>
                    <option>Kimyo & Biologiya (DTM Tibbiyot)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Bepul Darsga Yozilish</span>
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};
