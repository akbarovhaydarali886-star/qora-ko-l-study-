import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  BookOpen, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Award,
  Sparkles
} from 'lucide-react';

export const DirectorStudents = () => {
  const { students, groups, teachers, awardPoints } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');

  const filteredStudents = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          st.phone.includes(searchTerm);
    if (!matchesSearch) return false;

    if (selectedGroupFilter !== 'all' && st.groupId !== selectedGroupFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Barcha O'quvchilar Monitoringi
          </h2>
          <p className="text-xs text-slate-500">
            Markaz bo'yicha jami {students.length} nafar o'quvchi ro'yxati va ularning o'zlashtirish ko'rsatkichlari
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="O'quvchini qidirish..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Group Filter */}
          <select
            value={selectedGroupFilter}
            onChange={(e) => setSelectedGroupFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="all">Barcha Guruhlar</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">O'quvchi</th>
                <th className="py-4 px-4">Guruh & Ustoz</th>
                <th className="py-4 px-4">Telefonlar</th>
                <th className="py-4 px-4">Ballar</th>
                <th className="py-4 px-4">Davomat</th>
                <th className="py-4 px-6 text-right">To'lov Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">
                    O'quvchi topilmadi
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const grp = groups.find(g => g.id === student.groupId);
                  const teacher = teachers.find(t => t.id === grp?.teacherId);
                  const isPaid = student.paymentStatus === 'paid';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{student.name}</div>
                            <div className="text-[10px] text-slate-400">ID: {student.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Group and Teacher */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-blue-600">{grp?.name}</div>
                        <div className="text-[11px] text-slate-500">Ustoz: {teacher?.name || "Biriktirilmagan"}</div>
                      </td>

                      {/* Contacts */}
                      <td className="py-4 px-4">
                        <div className="text-slate-800 font-medium">{student.phone}</div>
                        {student.parentPhone && (
                          <div className="text-[10px] text-slate-400">Ota-ona: {student.parentPhone}</div>
                        )}
                      </td>

                      {/* Points */}
                      <td className="py-4 px-4">
                        <div className="font-black text-amber-600 text-sm flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{student.totalPoints}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">Reyting: #{student.rank || 1}</div>
                      </td>

                      {/* Attendance */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {student.attendanceRate}%
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="py-4 px-6 text-right">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> To'langan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Kechikmoqda
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
