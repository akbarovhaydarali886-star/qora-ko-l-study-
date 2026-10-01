import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Layers, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const StudentExams = () => {
  const { currentUser, exams, groups } = useApp();

  const userGroup = groups.find(g => g.id === currentUser?.groupId) || groups[0];
  const groupExams = exams.filter(e => e.groupId === userGroup?.id);

  const upcomingExams = groupExams.filter(e => e.status !== 'finished');
  const pastExams = groupExams.filter(e => e.status === 'finished');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Layers className="w-4 h-4" /> Sinov & Saralash Imtihonlari
          </span>
          <h2 className="text-2xl font-black">{userGroup?.name} Imtihonlari</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            Rejadagi testlar va imtihonlar ketma-ketligi. O'z vaqtida tayyorgarlik ko'ring!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[140px] border border-white/20">
          <div className="text-xs text-purple-200">Kutilayotgan sinov</div>
          <div className="text-2xl font-black text-amber-400 mt-0.5">
            {upcomingExams.length} ta
          </div>
        </div>
      </div>

      {/* Upcoming Exams Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>Yaqinlashayotgan Imtihonlar</span>
        </h3>

        {upcomingExams.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            Hozircha yaqinlashayotgan imtihon belgilanmagan
          </div>
        ) : (
          upcomingExams.map((exam) => (
            <div 
              key={exam.id}
              className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm hover:border-indigo-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 w-fit">
                  {exam.subject}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 text-indigo-600">
                    <Calendar className="w-3.5 h-3.5" /> {exam.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {exam.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {exam.room}
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-black text-slate-900 mb-2">{exam.title}</h4>
              <p className="text-xs text-slate-600 mb-4">{exam.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Savollar soni:</span>
                  <span className="font-bold text-slate-800">{exam.totalQuestions} ta</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Maksimal ball:</span>
                  <span className="font-bold text-slate-800">{exam.maxScore} ball</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Talab etiladi:</span>
                  <span className="font-bold text-amber-600">Ruchka & Qorako'l daftari</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Past Exams Results */}
      {pastExams.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>O'tgan Imtihon Natijalari</span>
          </h3>

          <div className="space-y-3">
            {pastExams.map((exam) => {
              const myResult = exam.results?.find(r => r.studentId === currentUser?.id);

              return (
                <div key={exam.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">{exam.title}</h4>
                    <span className="text-xs text-slate-500">{exam.date}</span>
                  </div>

                  {myResult ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-900">Sizning natijangiz:</span>
                        <div className="text-[11px] text-emerald-700">Guruhdagi o'rningiz: {myResult.rank}-o'rin</div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-emerald-700">
                          {myResult.score} / {exam.maxScore} ball
                        </span>
                        <div className="text-[10px] font-bold text-emerald-600">Baho: {myResult.grade}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">
                      Natijalar ustoz tomonidan yakunlanmoqda
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
