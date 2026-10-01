import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Sparkles, 
  TrendingUp, 
  Plus, 
  Flame, 
  Star, 
  History,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const TeacherGrading = ({ selectedGroupId }) => {
  const { students, groups, awardPoints, pointsLog } = useApp();

  const [activeModalStudent, setActiveModalStudent] = useState(null);
  const [pointsAmount, setPointsAmount] = useState(50);
  const [pointsType, setPointsType] = useState('homework');
  const [reason, setReason] = useState('');

  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupStudents = students
    .filter(s => s.groupId === currentGroup?.id)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const handleAwardSubmit = (e) => {
    e.preventDefault();
    if (!activeModalStudent) return;

    awardPoints(activeModalStudent.id, Number(pointsAmount), reason || "Darsdagi faollik", pointsType);
    setActiveModalStudent(null);
    setReason('');
    setPointsAmount(50);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-100 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-white" /> Qorako'l Motivatsiya & Ball Tizimi
          </span>
          <h2 className="text-2xl font-black">{currentGroup?.name} Ballari</h2>
          <p className="text-xs text-amber-100 mt-1 max-w-xl">
            O'quvchilarni uy vazifasi, darsdagi savol-javoblar va olimpiada misollarini yechganliklari uchun ballar bilan rag'batlantiring!
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center min-w-[140px] border border-white/30">
          <div className="text-xs text-white/90 font-medium">Guruh yetakchisi</div>
          <div className="text-lg font-black mt-0.5">{groupStudents[0]?.name || "-"}</div>
          <div className="text-xs font-bold text-amber-200">{groupStudents[0]?.totalPoints || 0} ball</div>
        </div>
      </div>

      {/* Grid: Left: Students Rating & Points / Right: Points History */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Students Leaderboard with Quick Award button (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>O'quvchilar reytingi va ballari</span>
              </h3>
              <span className="text-xs text-slate-400">Jami: {groupStudents.length} o'quvchi</span>
            </div>

            <div className="divide-y divide-slate-100">
              {groupStudents.map((student, idx) => (
                <div 
                  key={student.id}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                      idx === 0 
                        ? 'bg-amber-400 text-amber-950 shadow-sm' 
                        : idx === 1 
                          ? 'bg-slate-300 text-slate-800' 
                          : idx === 2 
                            ? 'bg-amber-700/30 text-amber-900' 
                            : 'bg-slate-100 text-slate-600'
                    }`}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                    </div>

                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                        {student.badges?.map(b => (
                          <span key={b} className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                            {b}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Davomat: <strong className="text-slate-600">{student.attendanceRate}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Points and Award Button */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-600">
                        {student.totalPoints}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">to'plangan ball</div>
                    </div>

                    <button
                      onClick={() => setActiveModalStudent(student)}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ball Berish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Points Log (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-blue-600" />
              <span>Oxirgi Berilgan Ballar</span>
            </h3>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {pointsLog.slice(0, 8).map(log => {
                const targetStudent = students.find(s => s.id === log.studentId);
                return (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900">{targetStudent?.name || "O'quvchi"}</span>
                      <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        +{log.points} ball
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mb-1.5">{log.reason}</p>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{log.date}</span>
                      <span>{log.givenBy}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Modal: Ball berish */}
      {activeModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={activeModalStudent.avatar}
                alt={activeModalStudent.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
              />
              <div>
                <h3 className="text-lg font-black text-slate-900">{activeModalStudent.name}</h3>
                <p className="text-xs text-slate-500">
                  Hozirgi ball: <strong className="text-amber-600">{activeModalStudent.totalPoints}</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleAwardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Qanday yutuq uchun?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setPointsType('homework'); setPointsAmount(50); }}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      pointsType === 'homework' 
                        ? 'border-amber-500 bg-amber-50 text-amber-800' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Uy ishi (+50)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPointsType('class_activity'); setPointsAmount(30); }}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      pointsType === 'class_activity' 
                        ? 'border-amber-500 bg-amber-50 text-amber-800' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Darsda faollik (+30)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPointsType('bonus'); setPointsAmount(100); }}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      pointsType === 'bonus' 
                        ? 'border-amber-500 bg-amber-50 text-amber-800' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Olimpiada (+100)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ball Miqdori
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={500}
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Izoh / Sabab
                </label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Masalan: EKUB mavzusidagi murakkab misolni yechdi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveModalStudent(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md shadow-amber-500/25 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ballni Tasdiqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
