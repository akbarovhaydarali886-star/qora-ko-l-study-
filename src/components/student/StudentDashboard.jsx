import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Layers, 
  Award, 
  Trophy, 
  CreditCard, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Star,
  MapPin,
  Check
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser, groups, lessons, exams, students, payments, recordPayment } = useApp();

  const [activeTab, setActiveTab] = useState('topics');
  // Aynan so'ralgan tartib: 'topics' (mavzular) | 'exams' (imtihonlar) | 'results' (natijalarim va baholarim) | 'ranking' (reyting) | 'payment'

  const userGroup = groups.find(g => g.id === currentUser?.groupId) || groups[0];
  const groupLessons = lessons.filter(l => l.groupId === userGroup?.id);
  const groupExams = exams.filter(e => e.groupId === userGroup?.id);
  const groupStudents = students
    .filter(s => s.groupId === userGroup?.id)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const myRank = groupStudents.findIndex(s => s.id === currentUser?.id) + 1;
  const isPaid = currentUser?.paymentStatus === 'paid';

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center font-bold text-2xl text-blue-400">
            🎓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser?.name}</h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                O'quvchi
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Guruh: <strong className="text-blue-400">{userGroup?.name}</strong> • Fan: {userGroup?.subject}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-mono">
              <span>Auditoriya: {userGroup?.room}</span>
              <span>•</span>
              <span>Dars vaqti: {userGroup?.schedule}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-center min-w-[120px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Mening Ballim</div>
            <div className="text-xl font-black text-amber-400 mt-0.5">
              {currentUser?.totalPoints || 0} ⭐
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">#{myRank || 1}-o'rin</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Aynan so'ralgan tartibda: Mavzular, Imtihonlar, Natijalarim va Baholarim, Reyting) */}
      <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-1 shadow-sm">
        
        {/* 1. Mavzular */}
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'topics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Mavzular & Darslar</span>
        </button>

        {/* 2. Imtihonlar */}
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'exams'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Imtihonlar</span>
        </button>

        {/* 3. Natijalarim va Baholarim */}
        <button
          onClick={() => setActiveTab('results')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'results'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Natijalarim & Baholarim</span>
        </button>

        {/* 4. Reyting */}
        <button
          onClick={() => setActiveTab('ranking')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'ranking'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>4. Sinf & Kurs Reytingi</span>
        </button>

        {/* To'lov */}
        <button
          onClick={() => setActiveTab('payment')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'payment'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>To'lov Holati</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* 1. MAVZULAR (Darslar & Uy vazifalari)                    */}
      {/* ======================================================== */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Guruh Dars Mavzulari va Uy Vazifalari
              </h2>
              <p className="text-xs text-slate-400">
                Har bir darsda o'tilgan mavzular, taqdimotlar va topshiriqlar
              </p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-xl">
              {groupLessons.length} ta dars
            </span>
          </div>

          <div className="space-y-3">
            {groupLessons.map((l) => (
              <div 
                key={l.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 border border-slate-800 text-blue-400 px-2 py-0.5 rounded">
                      {l.lessonNumber}-Dars
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{l.date} • {l.time}</span>
                  </div>

                  {l.isCompleted ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1 w-fit">
                      <Check className="w-3 h-3 text-emerald-400" /> Dars o'tildi ✅
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800 w-fit">
                      Rejalashtirilgan
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-black text-white">{l.topic}</h3>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                  <div className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>Uyga berilgan vazifa:</span>
                  </div>
                  <p className="text-slate-200">{l.homework}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. IMTIHONLAR (Javoblar o'quvchiga ko'rinmaydi!)         */}
      {/* ======================================================== */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Yaqinlashayotgan Imtihonlar Jadvali
              </h2>
              <p className="text-xs text-slate-400">
                Saralash va oraliq nazorat sinovlari sanasi va tartibi
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {groupExams.map((exam) => (
              <div key={exam.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">
                      {exam.subject}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{exam.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-xl w-fit">
                    Kutilmoqda
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Sana va Vaqt:</span>
                    <strong className="text-white">{exam.date} | {exam.time}</strong>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Auditoriya:</span>
                    <strong className="text-white">{exam.room}</strong>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Maksimal Ball:</span>
                    <strong className="text-emerald-400">{exam.maxScore} ball</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Imtihonga o'z vaqtida kelishingiz va yozuv qurollarini olib kelishingiz so'raladi.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. NATIJALARIM VA BAHOLARIM                              */}
      {/* ======================================================== */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Mening Baholarim va Sertifikatlarim
              </h2>
              <p className="text-xs text-slate-400">
                Fanlar bo'yicha to'plangan ballar va rasmiy yutuqlar
              </p>
            </div>
            <span className="text-xs font-black text-amber-400">
              Jami Ball: {currentUser?.totalPoints || 0} ⭐
            </span>
          </div>

          {/* Baholar Jadvali */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">Mavzu / Modul</th>
                  <th className="py-3.5 px-4">To'plangan Ball</th>
                  <th className="py-3.5 px-5 text-right">Baho Darajasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(currentUser?.grades || [
                  { subject: "Mantiqiy fikrlash", score: 98, grade: "A+" },
                  { subject: "Algebraik ifodalar", score: 95, grade: "A" }
                ]).map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40">
                    <td className="py-3.5 px-5 font-bold text-white">{g.subject}</td>
                    <td className="py-3.5 px-4 font-black text-amber-400">{g.score} / 100 ball</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-md font-black text-xs bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {g.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sertifikat Karti */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xl text-blue-400">
                🏆
              </div>
              <div>
                <h4 className="text-sm font-black text-white">
                  {currentUser?.certificate || "Qorako'l Ziyo Rasmiy Sertifikati"}
                </h4>
                <p className="text-xs text-slate-400">Rasmiy tasdiqlangan hujjat</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-xl">
              Faol
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. REYTING (Sinf & Kurs bo'yicha)                        */}
      {/* ======================================================== */}
      {activeTab === 'ranking' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                {userGroup?.name} — O'quvchilar Reytingi
              </h2>
              <p className="text-xs text-slate-400">
                Guruh va kurs bo'yicha eng yuqori ball to'plagan o'quvchilar ro'yxati
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-xl">
              Sizning o'rningiz: #{myRank}-o'rin
            </span>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">O'rin</th>
                  <th className="py-3.5 px-4">O'quvchi</th>
                  <th className="py-3.5 px-4">Davomat</th>
                  <th className="py-3.5 px-5 text-right">To'plangan Ball</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {groupStudents.map((st, i) => {
                  const isMe = st.id === currentUser?.id;

                  return (
                    <tr 
                      key={st.id} 
                      className={`transition-colors ${
                        isMe ? 'bg-blue-950/40 border-l-4 border-blue-600' : 'hover:bg-slate-950/40'
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <span className={`w-6 h-6 rounded-lg inline-flex items-center justify-center font-black text-xs ${
                          i === 0 
                            ? 'bg-amber-500 text-slate-950' 
                            : i === 1 
                              ? 'bg-slate-400 text-slate-950' 
                              : i === 2 
                                ? 'bg-amber-800 text-white' 
                                : 'bg-slate-800 text-slate-400'
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{st.name}</span>
                          {isMe && (
                            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.2 rounded font-black">
                              SIZ
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">{st.attendanceRate}%</td>
                      <td className="py-3.5 px-5 text-right font-black text-amber-400 text-sm">
                        {st.totalPoints} ball
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TO'LOV HOLATI                                         */}
      {/* ======================================================== */}
      {activeTab === 'payment' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Sentabr 2024
              </span>
              <h2 className="text-xl font-black text-white mt-1">Oylik To'lov Holati</h2>
              <p className="text-xs text-slate-400">Guruh to'lovi: {userGroup?.fee?.toLocaleString()} so'm</p>
            </div>

            <div className="text-right">
              {isPaid ? (
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5 w-fit">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> To'langan
                </span>
              ) : (
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-rose-950 text-rose-400 border border-rose-800 w-fit">
                  Qarzdorlik mavjud
                </span>
              )}
            </div>
          </div>

          {!isPaid && (
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">To'lovni amalga oshirish</h4>
                <p className="text-[11px] text-slate-400">Karta yoki Payme orqali to'lov qiling</p>
              </div>
              <button
                onClick={() => recordPayment(currentUser.id, userGroup?.fee || 650000, 'Payme')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Payme orqali to'lash
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
