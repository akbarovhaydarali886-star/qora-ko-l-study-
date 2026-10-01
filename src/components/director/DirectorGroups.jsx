import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  Layers, 
  Clock,
  Sparkles
} from 'lucide-react';

export const DirectorGroups = () => {
  const { groups, teachers, students, lessons, addGroup, toggleLessonCompleted } = useApp();

  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null);

  // New Group Form state
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [subject, setSubject] = useState('Matematika & Mantiq');
  const [schedule, setSchedule] = useState('Dush - Chor - Juma | 09:00 - 11:00');
  const [room, setRoom] = useState('301-auditoriya');
  const [fee, setFee] = useState(650000);
  const [level, setLevel] = useState('Intensiv');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addGroup({
      name,
      teacherId,
      subject,
      schedule,
      room,
      fee,
      level
    });

    setName('');
    setIsAddGroupOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Markaz Guruhlari va Dars Rejalari
          </h2>
          <p className="text-xs text-slate-500">
            Barcha faol guruhlar, ustozlar, dars jadvali va o'tilgan darslar (ptichka) monitoringi
          </p>
        </div>

        <button
          onClick={() => setIsAddGroupOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Guruh Ochish</span>
        </button>
      </div>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(grp => {
          const teacher = teachers.find(t => t.id === grp.teacherId);
          const grpStudents = students.filter(s => s.groupId === grp.id);
          const grpLessons = lessons.filter(l => l.groupId === grp.id);
          const doneLessons = grpLessons.filter(l => l.isCompleted).length;
          const progress = grpLessons.length > 0 ? Math.round((doneLessons / grpLessons.length) * 100) : 0;

          return (
            <div 
              key={grp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                    {grp.level}
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    {grp.fee?.toLocaleString()} so'm / oy
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1">{grp.name}</h3>
                <p className="text-xs font-semibold text-blue-600 mb-3">{grp.subject}</p>

                {/* Ustoz info */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 mb-4">
                  <img
                    src={teacher?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250"}
                    alt={teacher?.name}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Biriktirilgan Ustoz</div>
                    <div className="text-xs font-bold text-slate-800">{teacher?.name || "Tayinlanmagan"}</div>
                  </div>
                </div>

                {/* Schedule and Room */}
                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{grp.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{grp.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>O'quvchilar: <strong className="text-slate-800">{grpStudents.length} nafar</strong></span>
                  </div>
                </div>

                {/* Syllabus Progress */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-600">O'tilgan darslar (Ptichka):</span>
                    <span className="text-emerald-600">{doneLessons} / {grpLessons.length} ({progress}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedGroupDetails(grp)}
                className="mt-5 w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
              >
                Mavzular va Ptichkalarni ko'rish
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal: Guruh Darslari va Ptichkalari */}
      {selectedGroupDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">{selectedGroupDetails.name}</h3>
                <p className="text-xs text-slate-500">Mavzular, uy vazifalari va o'tilganlik nazorati</p>
              </div>
              <button
                onClick={() => setSelectedGroupDetails(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded-lg bg-slate-100"
              >
                Yopish
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {lessons.filter(l => l.groupId === selectedGroupDetails.id).length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Ushbu guruh uchun hali dars kiritilmagan
                </div>
              ) : (
                lessons.filter(l => l.groupId === selectedGroupDetails.id).map(lesson => (
                  <div 
                    key={lesson.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                      lesson.isCompleted ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-blue-600">{lesson.lessonNumber}-dars</span>
                        <span className="text-[11px] text-slate-400">{lesson.date}</span>
                        {lesson.isCompleted ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✅ O'tildi ({lesson.completedAt})
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            Kutilmoqda
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{lesson.topic}</div>
                      <div className="text-[11px] text-slate-600 mt-1">Uy ishi: {lesson.homework}</div>
                    </div>

                    <button
                      onClick={() => toggleLessonCompleted(lesson.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                        lesson.isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-emerald-50'
                      }`}
                    >
                      {lesson.isCompleted ? '✅ O\'tildi' : 'Ptichka qo\'yish'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Yangi Guruh Ochish */}
      {isAddGroupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Yangi O'quv Guruhi Ochish
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Markaz Boshlig'i sifatida yangi guruh rejasini belgilang
            </p>

            <form onSubmit={handleCreateGroup} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Guruh Nomi</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: SAT Matematika - SAT-101"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ustozni Biriktirish</label>
                  <select
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Daraja / Yo'nalish</label>
                  <input
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="Intensiv / Boshlang'ich"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dars Vaqti Jadvali</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Dush - Chor - Juma | 14:00 - 16:00"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Xona / Auditoriya</label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="205-xona"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Oylik To'lov (so'm)</label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddGroupOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
                >
                  Guruhni Ochish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
