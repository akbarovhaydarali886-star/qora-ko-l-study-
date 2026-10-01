import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  Plus, 
  Check, 
  X, 
  AlertCircle,
  HelpCircle,
  Key,
  Award,
  ChevronDown
} from 'lucide-react';

export const TeacherDashboard = () => {
  const { 
    currentUser, 
    groups, 
    students, 
    lessons, 
    exams, 
    attendance, 
    toggleLessonCompleted, 
    addLesson, 
    recordAttendance, 
    addExam, 
    showToast 
  } = useApp();

  // Ustoz guruhlari
  const teacherGroups = groups.filter(g => g.teacherId === currentUser?.id || !currentUser?.id);
  const activeGroup = teacherGroups.length > 0 ? teacherGroups : groups;

  const [selectedGroupId, setSelectedGroupId] = useState(activeGroup[0]?.id || groups[0]?.id);
  const [activeTab, setActiveTab] = useState('students');
  // 'students' | 'topics' | 'homework' | 'exams' | 'attendance'

  const currentGroupObj = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupStudents = students.filter(s => s.groupId === currentGroupObj?.id);
  const groupLessons = lessons.filter(l => l.groupId === currentGroupObj?.id);
  const groupExams = exams.filter(e => e.groupId === currentGroupObj?.id);

  // Yangi dars/mavzu modal holati
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newHomework, setNewHomework] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().substring(0, 10));

  // Davomat sanasi
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().substring(0, 10));
  const currentAttendance = attendance[attendanceDate] || {};

  // Yangi imtihon modal holati
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [examTitle, setExamTitle] = useState('');
  const [examDate, setExamDate] = useState(new Date().toISOString().substring(0, 10));
  const [examQ1, setExamQ1] = useState('');
  const [examA1, setExamA1] = useState('');

  const handleCreateLesson = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    addLesson({
      groupId: currentGroupObj.id,
      topic: newTopic,
      homework: newHomework,
      date: newDate,
      time: '08:30 - 10:30'
    });

    setNewTopic('');
    setNewHomework('');
    setIsAddLessonOpen(false);
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!examTitle.trim()) return;

    addExam({
      groupId: currentGroupObj.id,
      title: examTitle,
      subject: currentGroupObj.subject,
      date: examDate,
      time: '10:00 - 12:00',
      room: currentGroupObj.room,
      totalQuestions: 1,
      maxScore: 100,
      teacherAnswerKey: [
        {
          questionNumber: 1,
          question: examQ1 || "Imtihon savoli",
          correctAnswer: examA1 || "To'g'ri javob",
          explanation: "Ustoz tomonidan tasdiqlangan yechim",
          points: 100
        }
      ]
    });

    setExamTitle('');
    setExamQ1('');
    setExamA1('');
    setIsAddExamOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Ustoz Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md ring-2 ring-blue-500/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser?.name}</h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                Ustoz
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">{currentUser?.subject}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-mono">
              <span>Tel: {currentUser?.phone}</span>
              <span>•</span>
              <span className="text-blue-400 font-bold">{currentUser?.certificate}</span>
            </div>
          </div>
        </div>

        {/* Guruh tanlash */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Faol Guruh:
          </label>
          <div className="relative min-w-[220px]">
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-hidden focus:border-blue-500 appearance-none cursor-pointer"
            >
              {activeGroup.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Aynan so'ralgan tartibda: O'quvchilarim, Mavzular, Vazifalar, Imtihonlar, Davomat) */}
      <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-1 shadow-sm">
        
        {/* 1. O'quvchilarim */}
        <button
          onClick={() => setActiveTab('students')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>O'quvchilarim ({groupStudents.length})</span>
        </button>

        {/* 2. Mavzular */}
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'topics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Mavzular & Ptichka</span>
        </button>

        {/* 3. Vazifalar */}
        <button
          onClick={() => setActiveTab('homework')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'homework'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Vazifalar (Uy ishi)</span>
        </button>

        {/* 4. Imtihonlar va Savollari */}
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'exams'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Imtihonlar & Javoblari</span>
        </button>

        {/* 5. Davomat */}
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'attendance'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Davomat</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* 1. O'QUVCHILARIM                                         */}
      {/* ======================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                {currentGroupObj?.name} — O'quvchilari
              </h2>
              <p className="text-xs text-slate-400">
                Guruhdagi o'quvchilar ro'yxati, kontaktlari va baholari
              </p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-xl">
              {groupStudents.length} nafar o'quvchi
            </span>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">#</th>
                  <th className="py-3.5 px-4">O'quvchi Ismi</th>
                  <th className="py-3.5 px-4">Telefon</th>
                  <th className="py-3.5 px-4">Ota-ona Telefoni</th>
                  <th className="py-3.5 px-4">Ballari</th>
                  <th className="py-3.5 px-4">Davomati</th>
                  <th className="py-3.5 px-5 text-right">To'lov</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {groupStudents.map((st, i) => (
                  <tr key={st.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3.5 px-5 text-slate-500 font-bold">{i + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{st.name}</div>
                      <div className="text-[10px] text-slate-500">Sertifikat: {st.certificate || "Yo'q"}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{st.phone}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{st.parentPhone || "-"}</td>
                    <td className="py-3.5 px-4 font-black text-amber-400">{st.totalPoints} ball</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">{st.attendanceRate}%</td>
                    <td className="py-3.5 px-5 text-right">
                      {st.paymentStatus === 'paid' ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          To'langan
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                          Kechikmoqda
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
      {/* 2. MAVZULAR (Darslar & Ptichka)                          */}
      {/* ======================================================== */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Dars Mavzulari Jadvali & O'tilganlik Holati (Ptichka)
              </h2>
              <p className="text-xs text-slate-400">
                O'tilgan darslarni ptichka qiling, bu o'quvchilar va rahbariyatga avtomatik yetkaziladi
              </p>
            </div>

            <button
              onClick={() => setIsAddLessonOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Mavzu Qo'shish</span>
            </button>
          </div>

          <div className="space-y-3">
            {groupLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  lesson.isCompleted 
                    ? 'bg-slate-900/90 border-slate-800' 
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 border border-slate-800 text-blue-400 px-2 py-0.5 rounded">
                      {lesson.lessonNumber}-Dars
                    </span>
                    <span className="text-xs text-slate-500">{lesson.date} • {lesson.time}</span>
                    {lesson.isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        ✅ O'tildi ({lesson.completedAt})
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-white">{lesson.topic}</h3>
                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-300">Uyga vazifa:</strong> {lesson.homework}
                  </p>
                </div>

                <button
                  onClick={() => toggleLessonCompleted(lesson.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                    lesson.isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {lesson.isCompleted ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Ptichka qo'yilgan ✅</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-500" />
                      <span>Ptichka qo'yish (O'tildi)</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. VAZIFALAR (Uy ishlari)                                */}
      {/* ======================================================== */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Berilgan Uy Vazifalari Nazorati
              </h2>
              <p className="text-xs text-slate-400">
                O'quvchilarga berilgan vazifalar va topshirish ko'rsatkichlari
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupLessons.map((l) => (
              <div key={l.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">{l.lessonNumber}-Dars Vazifasi</span>
                  <span className="text-[11px] text-slate-500">{l.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-300">{l.topic}</h4>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white">
                  {l.homework}
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Topshirganlar:</span>
                  <strong className="text-emerald-400">{l.submittedCount || groupStudents.length} / {groupStudents.length} o'quvchi</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. IMTIHONLAR VA SAVOLLARI (FAQAT USTOZ KO'RADI!)       */}
      {/* ======================================================== */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          
          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white uppercase tracking-wider">
                  Imtihonlar va Savollari (Maxfiy Javoblar Kaliti)
                </h2>
                <span className="text-[10px] font-black uppercase bg-rose-950 text-rose-400 border border-rose-800 px-2 py-0.5 rounded">
                  Faqat Ustoz Uchun
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ushbu bo'limda imtihon savollari va ularning to'g'ri javoblari (Answer Key) faqat ustoz uchun ko'rinadi. O'quvchilarda javoblar ko'rinmaydi.
              </p>
            </div>

            <button
              onClick={() => setIsAddExamOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Imtihon & Savol Qo'shish</span>
            </button>
          </div>

          <div className="space-y-6">
            {groupExams.map((exam) => (
              <div key={exam.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded">
                      {exam.subject}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{exam.title}</h3>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Sana: {exam.date} | Xona: {exam.room} | Max: {exam.maxScore} ball
                  </div>
                </div>

                {/* SAVOLLAR VA JAVOBLAR (ANSWER KEY) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-blue-500" />
                    <span>Savollar Ro'yxati va To'g'ri Javoblar (Kalitlar):</span>
                  </h4>

                  <div className="space-y-3">
                    {exam.teacherAnswerKey?.map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-blue-400">
                            {item.questionNumber}-Savol ({item.points} ball):
                          </span>
                          <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                            Ustoz tekshiruvi
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">{item.question}</p>

                        {/* TO'G'RI JAVOB BLOKI */}
                        <div className="p-3 bg-blue-950/40 border border-blue-900/60 rounded-xl space-y-1">
                          <div className="text-[11px] font-black text-emerald-400 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>TO'G'RI JAVOB:</span>
                          </div>
                          <p className="text-xs font-medium text-slate-200">{item.correctAnswer}</p>
                          {item.explanation && (
                            <p className="text-[11px] text-slate-400 italic pt-1 border-t border-blue-900/40">
                              Yechim izohi: {item.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 5. DAVOMAT                                               */}
      {/* ======================================================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Dars Davomati Belgilash
              </h2>
              <p className="text-xs text-slate-400">
                O'quvchilar ishtirokini belgilang (Keldi / Kelmadi / Sababli)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold">Sana:</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white rounded-xl text-xs px-3 py-1.5 font-bold focus:outline-hidden"
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">#</th>
                  <th className="py-3.5 px-4">O'quvchi</th>
                  <th className="py-3.5 px-4">Telefon</th>
                  <th className="py-3.5 px-5 text-right">Davomat Belgisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {groupStudents.map((st, i) => {
                  const status = currentAttendance[st.id] || 'present';

                  return (
                    <tr key={st.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3.5 px-5 text-slate-500 font-bold">{i + 1}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{st.name}</td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{st.phone}</td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => recordAttendance(attendanceDate, st.id, 'present')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              status === 'present'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            Keldi
                          </button>
                          <button
                            onClick={() => recordAttendance(attendanceDate, st.id, 'absent')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              status === 'absent'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            Kelmadi
                          </button>
                          <button
                            onClick={() => recordAttendance(attendanceDate, st.id, 'excused')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              status === 'excused'
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            Sababli
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Modal: Yangi Dars Qo'shish */}
      {isAddLessonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white shadow-2xl">
            <h3 className="text-base font-black mb-3">Yangi Mavzu Qo'shish</h3>
            <form onSubmit={handleCreateLesson} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Dars Mavzusi</label>
                <input
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Masalan: Logarifmik tenglamalar"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Uyga Vazifa</label>
                <textarea
                  rows={2}
                  value={newHomework}
                  onChange={(e) => setNewHomework(e.target.value)}
                  placeholder="Masalan: 1-40 gacha toq misollar"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Sana</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddLessonOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Yangi Imtihon Qo'shish (Ustoz javoblari bilan) */}
      {isAddExamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white shadow-2xl">
            <h3 className="text-base font-black mb-3">Yangi Imtihon & Savol Qo'shish</h3>
            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Imtihon Nomi</label>
                <input
                  type="text"
                  required
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="Masalan: 2-Modul Yakuniy Imtihoni"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Savol Matni</label>
                <textarea
                  rows={2}
                  required
                  value={examQ1}
                  onChange={(e) => setExamQ1(e.target.value)}
                  placeholder="Masalan: Tenglamaning ildizlari yig'indisini toping..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-emerald-400 mb-1 font-bold">To'g'ri Javob (Maxfiy Kalit):</label>
                <input
                  type="text"
                  required
                  value={examA1}
                  onChange={(e) => setExamA1(e.target.value)}
                  placeholder="To'g'ri javob va yechim"
                  className="w-full px-3 py-2 bg-slate-950 border border-blue-900 rounded-xl text-white focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddExamOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
