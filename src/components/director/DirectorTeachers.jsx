import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  BookOpen, 
  Users, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Award,
  ChevronRight,
  Plus
} from 'lucide-react';

export const DirectorTeachers = () => {
  const { teachers, groups, students, lessons } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0] || null);

  // Ustozlarni qidirish (ismi, fani, telefoni bo'yicha)
  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone.includes(searchTerm)
  );

  // Tanlangan ustozning guruhlari
  const teacherGroups = selectedTeacher 
    ? groups.filter(g => g.teacherId === selectedTeacher.id) 
    : [];

  // Tanlangan ustozning barcha o'quvchilari
  const teacherGroupIds = teacherGroups.map(g => g.id);
  const teacherStudents = students.filter(s => teacherGroupIds.includes(s.groupId));

  // O'tilgan darslar (ptichka qilinganlar)
  const teacherLessons = lessons.filter(l => teacherGroupIds.includes(l.groupId));
  const completedLessons = teacherLessons.filter(l => l.isCompleted);

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Ustozlar Bazasini Qidirish va Nazorat
          </h2>
          <p className="text-xs text-slate-500">
            Markazdagi barcha ustozlar, ularning guruhlari, o'quvchilari va dars o'tish ko'rsatkichlari
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ustoz ismi yoki fani bo'yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Main Grid: Left List (4 cols) | Right Full Details (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Teachers Directory list */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Topilgan Ustozlar ({filteredTeachers.length} nafar):
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {filteredTeachers.map(teacher => {
              const isSelected = selectedTeacher?.id === teacher.id;
              const countOfGroups = groups.filter(g => g.teacherId === teacher.id).length;

              return (
                <div
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{teacher.name}</h4>
                      <p className="text-[11px] font-semibold text-blue-600">{teacher.subject}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-medium">
                        <span className="font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                          {countOfGroups} ta guruh
                        </span>
                        <span>⭐ {teacher.rating}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Teacher Detailed Dossier */}
        <div className="lg:col-span-8 space-y-6">
          {selectedTeacher ? (
            <div className="space-y-6">
              
              {/* Teacher Header Profile Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedTeacher.avatar}
                      alt={selectedTeacher.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md ring-4 ring-amber-50"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-slate-900">{selectedTeacher.name}</h3>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {selectedTeacher.experience} tajriba
                        </span>
                      </div>
                      <p className="text-sm font-bold text-blue-600 mt-0.5">{selectedTeacher.subject}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedTeacher.phone}
                        </span>
                        <span className="flex items-center gap-1 font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {selectedTeacher.rating} ball (Reyting)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  "{selectedTeacher.bio}"
                </p>

                {/* Key Performance Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <div className="text-[10px] text-amber-800 font-bold uppercase">Guruhlar Soni</div>
                    <div className="text-2xl font-black text-amber-700 mt-0.5">{teacherGroups.length} ta</div>
                  </div>

                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl">
                    <div className="text-[10px] text-blue-800 font-bold uppercase">O'quvchilar Soni</div>
                    <div className="text-2xl font-black text-blue-700 mt-0.5">{teacherStudents.length} nafar</div>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <div className="text-[10px] text-emerald-800 font-bold uppercase">O'tilgan Darslar</div>
                    <div className="text-2xl font-black text-emerald-700 mt-0.5">
                      {completedLessons.length} / {teacherLessons.length}
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl">
                    <div className="text-[10px] text-purple-800 font-bold uppercase">Davomat Ko'rsatkichi</div>
                    <div className="text-2xl font-black text-purple-700 mt-0.5">
                      {selectedTeacher.attendanceRate || 96}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Ustozning Guruhlari Ro'yxati */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Ustozga Biriktirilgan Guruhlar ({teacherGroups.length})</span>
                  </h4>
                  <span className="text-xs text-slate-400">Jami faol guruhlar</span>
                </div>

                {teacherGroups.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                    Ushbu ustozga hozircha yangi guruh biriktirilmagan
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {teacherGroups.map(grp => {
                      const stCount = students.filter(s => s.groupId === grp.id).length;
                      const grpLessons = lessons.filter(l => l.groupId === grp.id);
                      const doneLessons = grpLessons.filter(l => l.isCompleted).length;

                      return (
                        <div key={grp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                              {grp.level}
                            </span>
                            <span className="text-[11px] text-slate-500 font-bold">
                              {grp.fee?.toLocaleString()} so'm
                            </span>
                          </div>

                          <h5 className="text-sm font-black text-slate-900">{grp.name}</h5>

                          <div className="text-xs text-slate-500 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{grp.schedule}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{grp.room}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                            <span className="text-slate-600 font-semibold">O'quvchilar: <strong>{stCount} ta</strong></span>
                            <span className="text-emerald-700 font-bold">
                              Ptichka: {doneLessons}/{grpLessons.length} ✅
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Ustozning O'quvchilari Ro'yxati */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Ustozning O'quvchilari ({teacherStudents.length})</span>
                  </h4>
                  <span className="text-xs text-slate-400">Ballar va to'lov holati</span>
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
                  {teacherStudents.map((st, i) => (
                    <div key={st.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-400 w-4">{i + 1}.</span>
                        <img src={st.avatar} alt={st.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-slate-900">{st.name}</span>
                          <div className="text-[10px] text-slate-400">Tel: {st.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <span className="font-bold text-amber-600">{st.totalPoints} ball</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          st.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {st.paymentStatus === 'paid' ? 'To\'langan' : 'Kechikmoqda'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-400">
              Ustoz ma'lumotlarini ko'rish uchun chapdagi ro'yxatdan tanlang
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
