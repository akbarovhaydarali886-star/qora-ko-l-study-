import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Calendar, 
  Check, 
  X, 
  Clock, 
  UserCheck, 
  UserX, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const TeacherAttendance = ({ selectedGroupId }) => {
  const { students, groups, attendance, recordAttendance, showToast } = useApp();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));

  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupStudents = students.filter(s => s.groupId === currentGroup?.id);

  const dateAttendance = attendance[selectedDate] || {};

  // Hisob-kitoblar
  const presentCount = groupStudents.filter(s => dateAttendance[s.id] === 'present').length;
  const absentCount = groupStudents.filter(s => dateAttendance[s.id] === 'absent').length;
  const excusedCount = groupStudents.filter(s => dateAttendance[s.id] === 'excused').length;
  const totalMarked = presentCount + absentCount + excusedCount;

  const attendancePercent = groupStudents.length > 0 
    ? Math.round((presentCount / groupStudents.length) * 100) 
    : 0;

  // Barchasini "Keldi" qilish
  const handleMarkAllPresent = () => {
    groupStudents.forEach(s => {
      recordAttendance(selectedDate, s.id, 'present');
    });
    showToast(`Barcha ${groupStudents.length} ta o'quvchi "Keldi" deb belgilandi!`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Users className="w-4 h-4" /> Davomat Tizimi
          </span>
          <h2 className="text-xl font-black text-slate-900">{currentGroup?.name} Davomati</h2>
          <p className="text-xs text-slate-500">
            Dars sanasini tanlang va o'quvchilar ishtirokini qayd eting
          </p>
        </div>

        {/* Date Selector & Quick Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden"
            />
          </div>

          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Hammasini "Keldi" qilish</span>
          </button>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="text-xs font-bold text-emerald-800">Kelganlar</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{presentCount} nafar</div>
        </div>

        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
          <div className="text-xs font-bold text-rose-800">Kelmadi (Sababsiz)</div>
          <div className="text-2xl font-black text-rose-700 mt-1">{absentCount} nafar</div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <div className="text-xs font-bold text-amber-800">Sababli</div>
          <div className="text-2xl font-black text-amber-700 mt-1">{excusedCount} nafar</div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
          <div className="text-xs font-bold text-blue-800">Davomat Ko'rsatkichi</div>
          <div className="text-2xl font-black text-blue-700 mt-1">{attendancePercent}%</div>
        </div>
      </div>

      {/* Students Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800">
            O'quvchilar ro'yxati ({groupStudents.length} nafar)
          </h3>
          <span className="text-xs text-slate-400">
            Sana: <strong className="text-slate-700">{selectedDate}</strong>
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {groupStudents.map((student, index) => {
            const currentStatus = dateAttendance[student.id];

            return (
              <div 
                key={student.id}
                className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5">
                    {index + 1}.
                  </span>
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>Tel: {student.phone}</span>
                      <span>•</span>
                      <span className="text-blue-600 font-semibold">{student.totalPoints} ball</span>
                    </div>
                  </div>
                </div>

                {/* Status Selector Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  
                  {/* Keldi */}
                  <button
                    onClick={() => recordAttendance(selectedDate, student.id, 'present')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      currentStatus === 'present'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Keldi</span>
                  </button>

                  {/* Kelmadi */}
                  <button
                    onClick={() => recordAttendance(selectedDate, student.id, 'absent')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      currentStatus === 'absent'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Kelmadi</span>
                  </button>

                  {/* Sababli */}
                  <button
                    onClick={() => recordAttendance(selectedDate, student.id, 'excused')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      currentStatus === 'excused'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Sababli</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
