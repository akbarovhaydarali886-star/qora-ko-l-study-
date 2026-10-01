import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Send, 
  Plus, 
  FileText, 
  Check, 
  X,
  Filter,
  LogOut,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Briefcase
} from 'lucide-react';

export const DirectorDashboard = () => {
  const { 
    currentUser, 
    teachers, 
    groups, 
    students, 
    lessons, 
    payments, 
    recordPayment, 
    sendPaymentReminder, 
    showToast,
    logout 
  } = useApp();

  const [activeTab, setActiveTab] = useState('teachers'); 
  // 'teachers' | 'groups' | 'salaries' | 'attendance' | 'payments' | 'certificates'

  const [teacherCategoryFilter, setTeacherCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacherModal, setSelectedTeacherModal] = useState(null);

  // Filtrlangan ustozlar
  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.phone.includes(searchTerm);
    if (!matchesSearch) return false;

    if (teacherCategoryFilter !== 'all' && t.category !== teacherCategoryFilter) return false;

    return true;
  });

  // Moliya statistikasi
  const totalSalaries = teachers.reduce((acc, t) => acc + (t.salary || 0), 0);
  const totalPaidRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const overdueStudents = students.filter(s => s.paymentStatus === 'overdue');
  const totalOverdueDebt = overdueStudents.reduce((acc, s) => acc + (s.amountDue || 650000), 0);

  // Ustozlar toifalari bo'yicha hisob:
  const engCount = teachers.filter(t => t.category === 'Ingliz tili').length;
  const matCount = teachers.filter(t => t.category === 'Matematika').length;
  const kimCount = teachers.filter(t => t.category === 'Kimyo').length;
  const bioCount = teachers.filter(t => t.category === 'Biologiya').length;
  const fizCount = teachers.filter(t => t.category === 'Fizika').length;

  return (
    <div className="space-y-6">
      
      {/* Top Professional Executive Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md ring-2 ring-blue-500/20"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-md">
              ADMIN
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentUser?.name || "Oybek Rahimov"}
              </h1>
              <span className="text-[11px] font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-0.5 rounded-full">
                Boshliq (Super Nazorat)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Markaz Boshqaruvi: 20 nafar ustoz, barcha guruhlar, maoshlar, davomat va to'lovlar monitoringi
            </p>
          </div>
        </div>

        {/* Global Key Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-center min-w-[110px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Ustozlar</div>
            <div className="text-lg font-black text-white mt-0.5">{teachers.length} nafar</div>
            <div className="text-[10px] text-blue-400">5 ta yo'nalish</div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-center min-w-[110px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">O'quvchilar</div>
            <div className="text-lg font-black text-white mt-0.5">{students.length} nafar</div>
            <div className="text-[10px] text-emerald-400">{groups.length} ta guruh</div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-center min-w-[120px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Oylik Tushum</div>
            <div className="text-lg font-black text-emerald-400 mt-0.5">{totalPaidRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">so'm</div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-center min-w-[120px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Kechikkan Qarz</div>
            <div className="text-lg font-black text-rose-400 mt-0.5">{totalOverdueDebt.toLocaleString()}</div>
            <div className="text-[10px] text-rose-300 font-medium">{overdueStudents.length} o'quvchi</div>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar — Qat'iy to'q ko'k va oq dizayn */}
      <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-1 shadow-sm">
        
        {/* 1. Hodimlar faoliyati */}
        <button
          onClick={() => setActiveTab('teachers')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'teachers'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Hodimlar & Darslar ({teachers.length})</span>
        </button>

        {/* 2. Hodimlarning guruhlari */}
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'groups'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Hodimlar Guruhlari ({groups.length})</span>
        </button>

        {/* 3. Hodimlarning maoshlari */}
        <button
          onClick={() => setActiveTab('salaries')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'salaries'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Hodimlar Maoshlari</span>
        </button>

        {/* 4. O'quvchilar davomati */}
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'attendance'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>O'quvchilar Davomati</span>
        </button>

        {/* 5. O'quvchilar to'lovlari */}
        <button
          onClick={() => setActiveTab('payments')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'payments'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>O'quvchilar To'lovlari</span>
        </button>

        {/* 6. Natijalar va Sertifikatlar */}
        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'certificates'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Sertifikatlar & Natijalar</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* 1-TAB: HODIMLAR FAOLIYATI & DARSLAR QANDAY O'TILYAPTI   */}
      {/* ======================================================== */}
      {activeTab === 'teachers' && (
        <div className="space-y-5">
          
          {/* Filter and Category Pills */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ustoz ismi yoki fani bo'yicha qidiruv..."
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            {/* Category Selector (6 Ingliz, 6 Matematika, 3 Kimyo, 3 Biologiya, 2 Fizika) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                onClick={() => setTeacherCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  teacherCategoryFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Barchasi (20)
              </button>

              <button
                onClick={() => setTeacherCategoryFilter('Ingliz tili')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  teacherCategoryFilter === 'Ingliz tili'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Ingliz tili ({engCount})
              </button>

              <button
                onClick={() => setTeacherCategoryFilter('Matematika')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  teacherCategoryFilter === 'Matematika'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Matematika ({matCount})
              </button>

              <button
                onClick={() => setTeacherCategoryFilter('Kimyo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  teacherCategoryFilter === 'Kimyo'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Kimyo ({kimCount})
              </button>

              <button
                onClick={() => setTeacherCategoryFilter('Biologiya')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  teacherCategoryFilter === 'Biologiya'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Biologiya ({bioCount})
              </button>

              <button
                onClick={() => setTeacherCategoryFilter('Fizika')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  teacherCategoryFilter === 'Fizika'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Fizika ({fizCount})
              </button>
            </div>

          </div>

          {/* 20 Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((teacher, index) => {
              const teacherGroups = groups.filter(g => g.teacherId === teacher.id);
              const teacherGroupIds = teacherGroups.map(g => g.id);
              const teacherLessons = lessons.filter(l => teacherGroupIds.includes(l.groupId));
              const completedLessons = teacherLessons.filter(l => l.isCompleted).length;

              return (
                <div 
                  key={teacher.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar & Name */}
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-black text-white">{teacher.name}</h3>
                          <span className="text-[10px] text-slate-400 font-bold">#{index + 1}</span>
                        </div>
                        <p className="text-xs text-blue-400 font-medium">{teacher.subject}</p>
                      </div>
                    </div>

                    {/* Performance metrics: Darslar qanday o'tilyapti */}
                    <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Guruhlari soni:</span>
                        <span className="font-bold text-white">{teacherGroups.length} ta guruh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">O'quvchilari:</span>
                        <span className="font-bold text-white">{teacher.studentsCount} nafar</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dars o'tish sifati:</span>
                        <span className="font-bold text-emerald-400">
                          {teacher.completedLessonsRate}% bajarildi
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Davomat ko'rsatkichi:</span>
                        <span className="font-bold text-blue-400">{teacher.attendanceRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Oylik Maoshi:</span>
                        <span className="font-bold text-slate-200">
                          {teacher.salary.toLocaleString()} so'm
                        </span>
                      </div>
                    </div>

                    {/* Certificate Badge */}
                    <div className="mt-3 p-2 bg-slate-950 rounded-xl border border-slate-800/60 text-[11px] text-slate-300 flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="truncate">{teacher.certificate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">{teacher.phone}</span>
                    <button
                      onClick={() => setSelectedTeacherModal(teacher)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold transition-colors"
                    >
                      Batafsil
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 2-TAB: HODIMLARNING GURUHLARI                            */}
      {/* ======================================================== */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Markaz Guruhlari Ro'yxati
              </h2>
              <p className="text-xs text-slate-400">
                Ustozlarga biriktirilgan barcha o'quv guruhlari, jadvallar va auditoriyalar
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-blue-950 border border-blue-800 text-blue-400 rounded-xl">
              Jami: {groups.length} ta guruh
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => {
              const teacher = teachers.find(t => t.id === group.teacherId);
              const groupStudents = students.filter(s => s.groupId === group.id);

              return (
                <div key={group.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 border border-slate-800 text-blue-400 px-2 py-0.5 rounded-md">
                      {group.level}
                    </span>
                    <span className="text-xs font-black text-white">
                      {group.fee?.toLocaleString()} so'm / oy
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white">{group.name}</h3>
                  <p className="text-xs text-blue-400">{group.subject}</p>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biriktirilgan Ustoz:</span>
                      <strong className="text-white">{group.teacherName || teacher?.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dars Vaqti:</span>
                      <span>{group.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Auditoriya:</span>
                      <span>{group.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">O'quvchilar:</span>
                      <strong className="text-blue-400">{groupStudents.length} nafar</strong>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Dars rejasi bajarilishi:</span>
                      <span className="font-bold text-emerald-400">{group.syllabusProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className="bg-blue-600 h-full rounded-full" 
                        style={{ width: `${group.syllabusProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3-TAB: HODIMLARNING MAOSHLARI (SALARIES)                 */}
      {/* ======================================================== */}
      {activeTab === 'salaries' && (
        <div className="space-y-4">
          
          {/* Summary Box */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Hodimlar Oylik Maoshlari Fondi
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                20 nafar ustozning tasdiqlangan oylik ish haqi va to'lov holati
              </p>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 font-bold uppercase">Jami Maosh Fondi:</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {totalSalaries.toLocaleString()} so'm
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-5">#</th>
                    <th className="py-3.5 px-4">Ustoz Ismi</th>
                    <th className="py-3.5 px-4">Yo'nalishi</th>
                    <th className="py-3.5 px-4">Staji</th>
                    <th className="py-3.5 px-4">Belgilangan Maosh</th>
                    <th className="py-3.5 px-4">Holati</th>
                    <th className="py-3.5 px-5 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {teachers.map((teacher, idx) => (
                    <tr key={teacher.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3.5 px-5 text-slate-500 font-bold">{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold text-white text-xs">{teacher.name}</div>
                            <div className="text-[10px] text-slate-500">{teacher.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-blue-400 font-semibold">{teacher.subject}</td>
                      <td className="py-3.5 px-4 text-slate-300">{teacher.experience}</td>
                      <td className="py-3.5 px-4 font-black text-white">
                        {teacher.salary.toLocaleString()} so'm
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          teacher.salaryStatus === "To'langan" 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {teacher.salaryStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => showToast(`${teacher.name}ga maosh o'tkazmasi tasdiqlandi.`, 'success')}
                          className="px-3 py-1 bg-slate-950 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg border border-slate-800 font-bold transition-colors"
                        >
                          To'lash
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 4-TAB: O'QUVCHILAR DAVOMATI                             */}
      {/* ======================================================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                O'quvchilar Davomati Monitoringi
              </h2>
              <p className="text-xs text-slate-400">
                Markaz bo'yicha barcha o'quvchilarning darslardagi ishtiroki
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-xl">
              O'rtacha davomat: 94.2%
            </span>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">O'quvchi</th>
                  <th className="py-3.5 px-4">Guruh</th>
                  <th className="py-3.5 px-4">Telefon</th>
                  <th className="py-3.5 px-4">Ota-ona</th>
                  <th className="py-3.5 px-4">Davomat Foizi</th>
                  <th className="py-3.5 px-5 text-right">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-white">{st.name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-blue-400">{st.groupName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{st.phone}</td>
                    <td className="py-3.5 px-4 text-slate-400">{st.parentPhone || "-"}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-black text-emerald-400">{st.attendanceRate}%</span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      {st.attendanceRate >= 90 ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Namunali
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                          E'tibor zarur
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5-TAB: O'QUVCHILARNING TO'LOVLARI                       */}
      {/* ======================================================== */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          
          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                O'quvchilar Oylik To'lovlari Boshqaruvi
              </h2>
              <p className="text-xs text-slate-400">
                To'laganlar va to'lovi kechikayotganlar ro'yxati, eslatmalar yuborish
              </p>
            </div>

            <button
              onClick={() => {
                overdueStudents.forEach(s => sendPaymentReminder(s.id));
                showToast(`Barcha ${overdueStudents.length} ta qarzdorlarga SMS ogohlantirish yuborildi!`, 'info');
              }}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kechikkanlarga SMS Jo'natish ({overdueStudents.length})</span>
            </button>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">O'quvchi</th>
                  <th className="py-3.5 px-4">Guruh</th>
                  <th className="py-3.5 px-4">Telefon</th>
                  <th className="py-3.5 px-4">Summasi</th>
                  <th className="py-3.5 px-4">To'lov Holati</th>
                  <th className="py-3.5 px-5 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {students.map((st) => {
                  const isPaid = st.paymentStatus === 'paid';

                  return (
                    <tr key={st.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-white">{st.name}</div>
                      </td>
                      <td className="py-3.5 px-4 text-blue-400">{st.groupName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{st.phone}</td>
                      <td className="py-3.5 px-4 font-black text-white">
                        {isPaid ? "650,000 so'm" : `Qarz: ${st.amountDue.toLocaleString()} so'm`}
                      </td>
                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> To'langan
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800 flex items-center gap-1 w-fit">
                            <AlertCircle className="w-3 h-3" /> {st.overdueDays} kunga kechikmoqda
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        {!isPaid ? (
                          <button
                            onClick={() => recordPayment(st.id, st.amountDue, 'Naqd pul')}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all"
                          >
                            To'lovni Qabul Qilish
                          </button>
                        ) : (
                          <span className="text-slate-500 text-[11px] font-mono">Chek tasdiqlangan</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 6-TAB: NATIJALAR VA SERTIFIKATLAR                        */}
      {/* ======================================================== */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Ustoz va O'quvchilarning Rasmiy Sertifikatlari
              </h2>
              <p className="text-xs text-slate-400">
                IELTS, Milliy A+, Cambridge va Respublika Olimpiada natijalari
              </p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-xl">
              28+ Sertifikat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ustozlar sertifikatlari */}
            {teachers.slice(0, 9).map(t => (
              <div key={t.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-xs font-black text-white">{t.name}</span>
                </div>
                <div className="text-xs font-bold text-blue-400">{t.subject}</div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  {t.certificate}
                </div>
                <div className="text-[10px] text-slate-500">Holat: Tasdiqlangan & Hujjatli</div>
              </div>
            ))}

            {/* O'quvchilar sertifikatlari */}
            {students.slice(0, 3).map(s => (
              <div key={s.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-black text-white">{s.name} (O'quvchi)</span>
                </div>
                <div className="text-xs font-bold text-emerald-400">{s.groupName}</div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  {s.certificate}
                </div>
                <div className="text-[10px] text-slate-500">Ball: {s.totalPoints} | #{s.rank}-o'rin</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Ustoz Batafsil Ma'lumotlari */}
      {selectedTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedTeacherModal.avatar} alt={selectedTeacherModal.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="text-base font-black">{selectedTeacherModal.name}</h3>
                  <p className="text-xs text-blue-400">{selectedTeacherModal.subject}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeacherModal(null)}
                className="text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg text-xs"
              >
                Yopish
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Telefon:</span>
                <span className="font-bold">{selectedTeacherModal.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Ish staji:</span>
                <span className="font-bold">{selectedTeacherModal.experience}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Oylik maoshi:</span>
                <span className="font-bold text-emerald-400">{selectedTeacherModal.salary.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Sertifikati:</span>
                <span className="font-bold text-blue-400">{selectedTeacherModal.certificate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">O'tilgan darslar ko'rsatkichi:</span>
                <span className="font-bold text-emerald-400">{selectedTeacherModal.completedLessonsRate}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Davomat ko'rsatkichi:</span>
                <span className="font-bold text-blue-400">{selectedTeacherModal.attendanceRate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
