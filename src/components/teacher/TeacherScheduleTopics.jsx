import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle, 
  Circle, 
  Plus, 
  Calendar, 
  Clock, 
  BookOpen, 
  FileText, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';

export const TeacherScheduleTopics = ({ selectedGroupId }) => {
  const { lessons, toggleLessonCompleted, addLesson, groups } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [homework, setHomework] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState('08:30 - 10:30');
  const [notes, setNotes] = useState('');

  // Tanlangan guruh darslarini filtrlash
  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupLessons = lessons.filter(l => l.groupId === currentGroup?.id);

  const completedCount = groupLessons.filter(l => l.isCompleted).length;
  const progressPercent = groupLessons.length > 0 
    ? Math.round((completedCount / groupLessons.length) * 100) 
    : 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addLesson({
      groupId: currentGroup.id,
      topic,
      homework,
      date,
      time,
      notes
    });

    setTopic('');
    setHomework('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Progress */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4" /> Dars Jadvali & O'tilgan Mavzular
          </span>
          <h2 className="text-2xl font-black">{currentGroup?.name}</h2>
          <p className="text-xs text-blue-200 mt-1">
            Mavzularni o'tganingiz sari ptichka (✅) qilib boring. Bu o'quvchilar va rahbariyatga avtomatik ko'rinadi.
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[260px]">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span>Dastur bajarilishi:</span>
            <span className="text-amber-300 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-black/30 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-blue-200 mt-2 flex justify-between">
            <span>O'tildi: {completedCount} ta</span>
            <span>Jami: {groupLessons.length} ta dars</span>
          </div>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Mavzular va Uy Vazifalari Ro'yxati</h3>
          <p className="text-xs text-slate-500">
            Dars o'tilgach o'ng tomondagi ptichka tugmasini bosing
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Dars / Mavzu Qo'shish</span>
        </button>
      </div>

      {/* Lessons List */}
      <div className="space-y-3.5">
        {groupLessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-600">Ushbu guruh uchun hali dars kiritilmagan</p>
            <p className="text-xs text-slate-400">Yangi dars qo'shish tugmasi orqali mavzu va uy ishini kiriting</p>
          </div>
        ) : (
          groupLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                lesson.isCompleted
                  ? 'bg-emerald-50/40 border-emerald-200/80 shadow-xs'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-sm'
              }`}
            >
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    lesson.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {lesson.lessonNumber}-Dars
                  </span>
                  
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {lesson.date}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.time}
                  </span>

                  {lesson.isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white">
                      <Check className="w-3 h-3" /> O'tildi ({lesson.completedAt})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                      Rejalashtirilgan
                    </span>
                  )}
                </div>

                {/* Mavzu */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{lesson.topic}</span>
                  </h4>
                </div>

                {/* Uyga vazifa */}
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Uyga vazifa: </span>
                    <span>{lesson.homework || "Vazifa belgilanmagan"}</span>
                  </div>
                </div>

                {lesson.notes && (
                  <div className="text-[11px] text-slate-500 italic">
                    Eslatma: {lesson.notes}
                  </div>
                )}
              </div>

              {/* Right: Ptichka Action Button */}
              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                <button
                  onClick={() => toggleLessonCompleted(lesson.id)}
                  className={`w-full md:w-auto px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    lesson.isCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                  }`}
                  title={lesson.isCompleted ? "O'tilganlikni bekor qilish" : "Dars o'tildi deb belgilash"}
                >
                  {lesson.isCompleted ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Dars O'tildi ✅</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                      <span>Ptichka qo'yish (O'tildi)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Modal: Yangi Dars Qo'shish */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Yangi Dars va Uy Ishi Qo'shish
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Guruh: <span className="font-bold text-blue-600">{currentGroup?.name}</span>
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dars Mavzusi
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Masalan: Logarifmik tenglamalar va tengsizliklar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uyga Vazifa
                </label>
                <textarea
                  rows={3}
                  required
                  value={homework}
                  onChange={(e) => setHomework(e.target.value)}
                  placeholder="Masalan: 4-mavzu 1-35 gacha toq misollar va 5 ta olimpiada testi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dars Sanasi
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dars Vaqti
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="08:30 - 10:30"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ustoz Eslatmasi (ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Masalan: Keyingi darsda kalkulyator kerak emas"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
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
                  className="px-5 py-2.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/25"
                >
                  Jadvalga Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
