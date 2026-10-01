import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const StudentSchedule = () => {
  const { currentUser, groups, lessons } = useApp();

  const userGroup = groups.find(g => g.id === currentUser?.groupId) || groups[0];
  const groupLessons = lessons.filter(l => l.groupId === userGroup?.id);

  const completedLessons = groupLessons.filter(l => l.isCompleted);
  const upcomingLessons = groupLessons.filter(l => !l.isCompleted);

  return (
    <div className="space-y-6">
      
      {/* Group Info Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4" /> Mening Darslarim & Uy Vazifalari
          </span>
          <h2 className="text-2xl font-black">{userGroup?.name}</h2>
          <p className="text-xs text-blue-200 mt-1">
            Dars jadvali: <strong className="text-white">{userGroup?.schedule}</strong> | Auditoriya: <strong className="text-white">{userGroup?.room}</strong>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[160px] border border-white/20">
          <div className="text-xs text-blue-200">O'tilgan darslar</div>
          <div className="text-2xl font-black text-amber-400 mt-0.5">
            {completedLessons.length} / {groupLessons.length}
          </div>
          <div className="text-[10px] text-emerald-300 mt-1 font-semibold">
            {Math.round((completedLessons.length / (groupLessons.length || 1)) * 100)}% bajarildi
          </div>
        </div>
      </div>

      {/* Next Upcoming Lesson Focus Card */}
      {upcomingLessons.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-white">
              Navbatdagi Dars
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {upcomingLessons[0].date}
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {upcomingLessons[0].time}
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>{upcomingLessons[0].topic}</span>
          </h3>

          <div className="p-4 bg-white rounded-2xl border border-amber-200/80 text-xs text-slate-700">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-amber-800">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Uyga berilgan vazifa:</span>
            </div>
            <p className="leading-relaxed">
              {upcomingLessons[0].homework || "Ustoz hali yangi vazifa kiritmadi"}
            </p>
          </div>
        </div>
      )}

      {/* All Lessons & Homeworks */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Barcha Darslar va Mavzular Tarixi</span>
        </h3>

        <div className="space-y-3">
          {groupLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-5 rounded-2xl border transition-all ${
                lesson.isCompleted
                  ? 'bg-white border-emerald-200/80 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                    lesson.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {lesson.lessonNumber}-dars
                  </span>
                  <span className="text-xs text-slate-500">{lesson.date} • {lesson.time}</span>
                </div>

                {lesson.isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Dars o'tildi ✅
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Kutilmoqda
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-2">
                {lesson.topic}
              </h4>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                <span className="font-bold text-slate-700">Uy ishi: </span>
                <span className="text-slate-600">{lesson.homework || "Mavzuni takrorlash"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
