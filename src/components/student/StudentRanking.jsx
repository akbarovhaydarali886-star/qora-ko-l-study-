import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Star, 
  Sparkles, 
  Award,
  Users
} from 'lucide-react';

export const StudentRanking = () => {
  const { currentUser, students, groups } = useApp();

  const userGroup = groups.find(g => g.id === currentUser?.groupId) || groups[0];
  const groupStudents = students
    .filter(s => s.groupId === userGroup?.id)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const myRank = groupStudents.findIndex(s => s.id === currentUser?.id) + 1;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Trophy className="w-4 h-4" /> Sinf Peshqadamlari
          </span>
          <h2 className="text-2xl font-black">{userGroup?.name} Reytingi</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            Sinfdoshlaringiz orasida to'plangan ballar bo'yicha umumiy peshqadamlar jadvali.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[160px] border border-white/20">
          <div className="text-xs text-blue-200">Sizning o'rningiz:</div>
          <div className="text-3xl font-black text-amber-400 mt-0.5">
            {myRank > 0 ? `${myRank}-o'rin` : '1-o\'rin'}
          </div>
          <div className="text-[10px] text-emerald-300 font-semibold mt-1">
            Jami: {groupStudents.length} o'quvchi
          </div>
        </div>
      </div>

      {/* Podium for Top 3 */}
      {groupStudents.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 pb-2">
          
          {/* 2nd Place */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 text-center flex flex-col items-center justify-end relative shadow-xs order-1">
            <div className="text-2xl mb-1">🥈</div>
            <img
              src={groupStudents[1].avatar}
              alt={groupStudents[1].name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-slate-300 mb-2 shadow-sm"
            />
            <div className="text-xs sm:text-sm font-black text-slate-900 truncate max-w-[120px]">
              {groupStudents[1].name}
            </div>
            <div className="text-xs font-black text-slate-600 mt-0.5">
              {groupStudents[1].totalPoints} ball
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold mt-1">
              2-o'rin
            </span>
          </div>

          {/* 1st Place */}
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-4 sm:p-6 border-2 border-amber-300 text-center flex flex-col items-center justify-end relative shadow-md order-2 -mt-4">
            <div className="text-3xl mb-1 animate-bounce">👑</div>
            <img
              src={groupStudents[0].avatar}
              alt={groupStudents[0].name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-400 mb-2 shadow-md ring-4 ring-amber-200"
            />
            <div className="text-xs sm:text-base font-black text-slate-900 truncate max-w-[140px]">
              {groupStudents[0].name}
            </div>
            <div className="text-xs sm:text-sm font-black text-amber-600 mt-0.5">
              {groupStudents[0].totalPoints} ball
            </div>
            <span className="text-[10px] bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full font-black mt-1 shadow-xs">
              Guruh Lideri 🥇
            </span>
          </div>

          {/* 3rd Place */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 text-center flex flex-col items-center justify-end relative shadow-xs order-3">
            <div className="text-2xl mb-1">🥉</div>
            <img
              src={groupStudents[2].avatar}
              alt={groupStudents[2].name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-amber-700/40 mb-2 shadow-sm"
            />
            <div className="text-xs sm:text-sm font-black text-slate-900 truncate max-w-[120px]">
              {groupStudents[2].name}
            </div>
            <div className="text-xs font-black text-slate-600 mt-0.5">
              {groupStudents[2].totalPoints} ball
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold mt-1">
              3-o'rin
            </span>
          </div>

        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>To'liq Sinf Ro'yxati</span>
          </h3>
          <span className="text-xs text-slate-400">Jami: {groupStudents.length} o'quvchi</span>
        </div>

        <div className="divide-y divide-slate-100">
          {groupStudents.map((st, idx) => {
            const isMe = st.id === currentUser?.id;

            return (
              <div
                key={st.id}
                className={`px-6 py-4 flex items-center justify-between gap-4 transition-colors ${
                  isMe ? 'bg-blue-50/80 font-bold border-l-4 border-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                    idx === 0 
                      ? 'bg-amber-400 text-amber-950' 
                      : idx === 1 
                        ? 'bg-slate-300 text-slate-800' 
                        : idx === 2 
                          ? 'bg-amber-800/30 text-amber-950' 
                          : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx + 1}
                  </div>

                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-900 font-bold">{st.name}</span>
                      {isMe && (
                        <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                          Siz
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      Davomat: <strong className="text-slate-600">{st.attendanceRate}%</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-black text-amber-600">
                    {st.totalPoints}
                  </div>
                  <div className="text-[10px] text-slate-400">ball</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
