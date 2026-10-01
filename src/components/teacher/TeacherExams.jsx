import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Plus, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const TeacherExams = ({ selectedGroupId }) => {
  const { exams, addExam, groups, students } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 - 12:00');
  const [room, setRoom] = useState("Bosh Zal");
  const [totalQuestions, setTotalQuestions] = useState(30);
  const [maxScore, setMaxScore] = useState(100);
  const [description, setDescription] = useState('');

  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupExams = exams.filter(e => e.groupId === currentGroup?.id);

  // Ketma-ketlik bo'yicha saralash
  const sortedExams = [...groupExams].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addExam({
      groupId: currentGroup.id,
      title,
      subject: subject || currentGroup.subject,
      date,
      time,
      room,
      totalQuestions,
      maxScore,
      description
    });

    setTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Layers className="w-4 h-4" /> Sinov & Nazorat Ketma-ketligi
          </span>
          <h2 className="text-2xl font-black">{currentGroup?.name} Imtihonlari</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            Rejalashtirilgan sinov testlari, diagnostik va oylik imtihonlar ketma-ketligi. O'quvchilar ushbu jadvalni o'z profilida ko'rib borishadi.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Imtihon Belgilash</span>
        </button>
      </div>

      {/* Timeline of Exams */}
      <div className="relative border-l-2 border-indigo-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 my-8">
        {sortedExams.map((exam, index) => {
          const isPast = exam.status === 'finished';

          return (
            <div key={exam.id} className="relative group">
              {/* Timeline dot */}
              <div className={`absolute -left-[35px] sm:-left-[43px] top-1 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
                isPast 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-indigo-600 text-white ring-4 ring-indigo-100'
              }`}>
                {index + 1}
              </div>

              <div className={`p-6 rounded-3xl border transition-all ${
                isPast 
                  ? 'bg-emerald-50/30 border-emerald-200/70' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isPast ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {isPast ? 'O\'tkazilgan' : 'Yaqinlashayotgan Sinov'}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">{exam.title}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {exam.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" /> {exam.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {exam.room}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4">{exam.description}</p>

                {/* Exam Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Fan / Mavzu:</span>
                    <span className="font-bold text-slate-800">{exam.subject}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Savollar soni:</span>
                    <span className="font-bold text-slate-800">{exam.totalQuestions} ta</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Maksimal Ball:</span>
                    <span className="font-bold text-slate-800">{exam.maxScore} ball</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Guruh:</span>
                    <span className="font-bold text-blue-600">{currentGroup?.name}</span>
                  </div>
                </div>

                {/* Exam Results if finished */}
                {exam.results && exam.results.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Imtihon Natijalari (Top natijalar)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {exam.results.map((res, i) => {
                        const st = students.find(s => s.id === res.studentId);
                        return (
                          <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200 text-xs">
                            <span className="font-bold text-slate-800">
                              {i + 1}. {st?.name || "O'quvchi"}
                            </span>
                            <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              {res.score} ball ({res.grade})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Yangi Imtihon */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Yangi Imtihon Belgilash
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Guruh: <span className="font-bold text-indigo-600">{currentGroup?.name}</span>
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Imtihon Nomi
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: 2-Oylik Saralash Testi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fan / Yo'nalish
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={currentGroup?.subject}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sana
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vaqt
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="10:00 - 12:00"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Xona / Auditoriya
                  </label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Savollar soni
                  </label>
                  <input
                    type="number"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Maksimal Ball
                  </label>
                  <input
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Qo'shimcha tavsif
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Imtihon qoidalari, kalkulyator yoki formulalar jadvali ruxsat berilganligi haqida..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md"
                >
                  Imtihonni Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
