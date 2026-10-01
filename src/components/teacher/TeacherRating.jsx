import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Star, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Award, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const TeacherRating = () => {
  const { teachers, groups, currentUser } = useApp();

  // Reyting bo'yicha saralash
  const sortedTeachers = [...teachers].sort((a, b) => b.rating - a.rating);

  const myRank = sortedTeachers.findIndex(t => t.id === currentUser?.id) + 1;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Trophy className="w-4 h-4" /> Qorako'l Pedagogik Reytingi
          </span>
          <h2 className="text-2xl font-black">Ustozlar Ichki Reytingi</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            Reyting o'quvchilarning o'rtacha imtihon ko'rsatkichlari, davomat darajasi, olimpiada yutuqlari va ota-onalar fikrlari asosida avtomatik hisoblanadi.
          </p>
        </div>

        {currentUser?.role === 'teacher' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[200px]">
            <div className="text-xs text-blue-200">Sizning o'rningiz:</div>
            <div className="text-3xl font-black text-amber-400 mt-0.5">
              {myRank > 0 ? `${myRank}-o'rin` : 'A\'zo'}
            </div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">
              Reyting: {currentUser.rating || 5.0} ⭐
            </div>
          </div>
        )}
      </div>

      {/* Teachers Leaderboard List */}
      <div className="space-y-4">
        {sortedTeachers.map((teacher, index) => {
          const isCurrentTeacher = currentUser?.id === teacher.id;
          const teacherGroups = groups.filter(g => g.teacherId === teacher.id);

          return (
            <div
              key={teacher.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isCurrentTeacher
                  ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Left Profile Info */}
              <div className="flex items-center gap-4">
                {/* Position Badge */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow-sm ${
                  index === 0
                    ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-100'
                    : index === 1
                      ? 'bg-slate-200 text-slate-800'
                      : index === 2
                        ? 'bg-amber-700/20 text-amber-900'
                        : 'bg-slate-100 text-slate-600'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                </div>

                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">{teacher.name}</h3>
                    {isCurrentTeacher && (
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Siz
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-blue-600">{teacher.subject}</p>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{teacher.bio}</p>
                </div>
              </div>

              {/* Center / Right Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Reyting Bali:</span>
                  <span className="font-black text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {teacher.rating} / 5.0
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Guruhlar soni:</span>
                  <span className="font-bold text-slate-800">{teacherGroups.length} ta guruh</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">O'quvchilar:</span>
                  <span className="font-bold text-slate-800">{teacher.studentsCount} nafar</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Davomat ko'rsatkichi:</span>
                  <span className="font-bold text-emerald-600">{teacher.attendanceRate || 95}%</span>
                </div>
              </div>

              {/* Achievements Tags */}
              <div className="hidden xl:flex flex-col gap-1 shrink-0 min-w-[160px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Yutuqlar:</span>
                {teacher.achievements?.map((ach, i) => (
                  <span key={i} className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{ach}</span>
                  </span>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
