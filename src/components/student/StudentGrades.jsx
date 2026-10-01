import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Sparkles, 
  Flame, 
  Star, 
  TrendingUp, 
  History, 
  CheckCircle2,
  Trophy
} from 'lucide-react';

export const StudentGrades = () => {
  const { currentUser, pointsLog, groups } = useApp();

  const userGroup = groups.find(g => g.id === currentUser?.groupId) || groups[0];
  const userLogs = pointsLog.filter(p => p.studentId === currentUser?.id);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-100 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-white" /> Mening Yutuqlarim & Ballarim
          </span>
          <h2 className="text-3xl font-black">{currentUser?.totalPoints || 0} Ball</h2>
          <p className="text-xs text-amber-100 mt-1 max-w-lg">
            Uy vazifasini muntazam topshirib, darslarda faol qatnashing va yangi unvonlarni qo'lga kiriting!
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center min-w-[120px] border border-white/30">
            <div className="text-xs text-amber-100">Sinfdagi O'rningiz</div>
            <div className="text-2xl font-black text-white mt-0.5">
              {currentUser?.rank || 1}-o'rin 🏆
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center min-w-[120px] border border-white/30">
            <div className="text-xs text-amber-100">Davomatingiz</div>
            <div className="text-2xl font-black text-white mt-0.5">
              {currentUser?.attendanceRate || 95}%
            </div>
          </div>
        </div>
      </div>

      {/* Badges / Unvonlar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Qo'lga Kiritilgan Maxsus Unvonlar</span>
        </h3>

        <div className="flex flex-wrap gap-3">
          {(currentUser?.badges || ['A\'lochi', 'Mantiq Ustasi']).map((badge, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                🎖️
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">{badge}</div>
                <div className="text-[10px] text-amber-700">Qorako'l standarti</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" />
          <span>Olingan Ballar Tarixi</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {userLogs.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              Hozircha ballar yozuvi yo'q
            </div>
          ) : (
            userLogs.map((log) => (
              <div key={log.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                    +{log.points}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{log.reason}</h4>
                    <span className="text-[10px] text-slate-400">Ustoz: {log.givenBy}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    +{log.points} ball
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{log.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
