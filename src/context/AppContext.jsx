import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_DIRECTOR,
  INITIAL_TEACHERS,
  INITIAL_GROUPS,
  INITIAL_STUDENTS,
  INITIAL_LESSONS,
  INITIAL_EXAMS,
  INITIAL_ATTENDANCE,
  INITIAL_PAYMENTS
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const loadStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`qorakol_v2_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.error(e);
      return fallback;
    }
  };

  const [currentUser, setCurrentUser] = useState(() => loadStorage('currentUser', null));
  const [teachers, setTeachers] = useState(() => loadStorage('teachers', INITIAL_TEACHERS));
  const [students, setStudents] = useState(() => loadStorage('students', INITIAL_STUDENTS));
  const [groups, setGroups] = useState(() => loadStorage('groups', INITIAL_GROUPS));
  const [lessons, setLessons] = useState(() => loadStorage('lessons', INITIAL_LESSONS));
  const [exams, setExams] = useState(() => loadStorage('exams', INITIAL_EXAMS));
  const [attendance, setAttendance] = useState(() => loadStorage('attendance', INITIAL_ATTENDANCE));
  const [payments, setPayments] = useState(() => loadStorage('payments', INITIAL_PAYMENTS));

  const [toastMessage, setToastMessage] = useState(null);

  // Storage sinxronizatsiyasi
  useEffect(() => {
    localStorage.setItem('qorakol_v2_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_lessons', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('qorakol_v2_payments', JSON.stringify(payments));
  }, [payments]);

  // Toast bildirishnoma
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Kirish (Login) funksiyasi — Qat'iy Validatsiya
  const login = (username, password, selectedRole) => {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanUser || !cleanPass) {
      showToast("Iltimos, login va parolni kiriting!", 'error');
      return { success: false, error: "Login va parol kiritilishi shart" };
    }

    // 1. RAHBAR (OYBEK) TEKSHIRUVI: name === 'oybek' && password === 'oybek1234'
    if (cleanUser === 'oybek' && cleanPass === 'oybek1234') {
      const directorUser = { ...INITIAL_DIRECTOR };
      setCurrentUser(directorUser);
      showToast(`Tizimga xush kelibsiz, Oybek Rahimov! (Boshliq Paneli)`, 'success');
      return { success: true, user: directorUser };
    }

    // 2. Ustoz sifatida kirish
    if (selectedRole === 'teacher') {
      const foundTeacher = teachers.find(
        t => t.username.toLowerCase() === cleanUser || 
             t.name.toLowerCase().includes(cleanUser) ||
             t.phone.replace(/\s+/g, '') === cleanUser.replace(/\s+/g, '')
      );

      if (foundTeacher) {
        setCurrentUser(foundTeacher);
        showToast(`Xush kelibsiz, ${foundTeacher.name}!`, 'success');
        return { success: true, user: foundTeacher };
      }
    }

    // 3. O'quvchi sifatida kirish
    if (selectedRole === 'student') {
      const foundStudent = students.find(
        s => s.username.toLowerCase() === cleanUser || 
             s.name.toLowerCase().includes(cleanUser) ||
             s.phone.replace(/\s+/g, '') === cleanUser.replace(/\s+/g, '')
      );

      if (foundStudent) {
        setCurrentUser(foundStudent);
        showToast(`Xush kelibsiz, ${foundStudent.name}!`, 'success');
        return { success: true, user: foundStudent };
      }
    }

    showToast("Login yoki parol noto'g'ri kiritildi!", 'error');
    return { success: false, error: "Foydalanuvchi topilmadi" };
  };

  // Ro'yxatdan o'tish (Register)
  const register = (data) => {
    const { role, name, phone, parentPhone, subject, category, groupId } = data;

    if (!name?.trim() || !phone?.trim()) {
      showToast("Ism va telefon raqami kiritilishi shart!", 'error');
      return { success: false };
    }

    if (role === 'teacher') {
      const newTeacher = {
        id: `t_${Date.now()}`,
        name: name.trim(),
        username: name.toLowerCase().replace(/\s+/g, '_'),
        role: 'teacher',
        subject: subject || `${category || 'Matematika'} mutaxassisi`,
        category: category || 'Matematika',
        phone: phone.trim(),
        salary: 10000000,
        salaryStatus: 'Kutilmoqda',
        experience: 'Yangi ustoz',
        rating: 5.0,
        studentsCount: 0,
        activeGroups: [],
        certificate: `${category || 'Fan'} bo'yicha pedagogik sertifikat`,
        completedLessonsRate: 100,
        attendanceRate: 100,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
      };

      setTeachers(prev => [newTeacher, ...prev]);
      setCurrentUser(newTeacher);
      showToast(`Tabriklaymiz, ${newTeacher.name}! Ustoz sifatida ro'yxatdan o'tdingiz.`, 'success');
      return { success: true, user: newTeacher };
    } else {
      // O'quvchi
      const targetGroup = groups.find(g => g.id === groupId) || groups[0];
      const newStudent = {
        id: `st_${Date.now()}`,
        name: name.trim(),
        username: name.toLowerCase().replace(/\s+/g, '_'),
        role: 'student',
        groupId: targetGroup.id,
        groupName: targetGroup.name,
        courseName: targetGroup.subject,
        phone: phone.trim(),
        parentPhone: parentPhone?.trim() || '',
        totalPoints: 100,
        rank: students.filter(s => s.groupId === targetGroup.id).length + 1,
        attendanceRate: 100,
        paymentStatus: 'paid',
        overdueDays: 0,
        amountDue: 0,
        lastPaymentDate: new Date().toISOString().substring(0, 10),
        certificate: "Qorako'l Ziyo Qabul Sertifikati",
        grades: [
          { subject: "Boshlang'ich sinov", score: 85, grade: "B+" }
        ]
      };

      setStudents(prev => [newStudent, ...prev]);
      setCurrentUser(newStudent);
      showToast(`Tabriklaymiz, ${newStudent.name}! O'quvchi sifatida ro'yxatdan o'tdingiz.`, 'success');
      return { success: true, user: newStudent };
    }
  };

  // Chiqish
  const logout = () => {
    setCurrentUser(null);
    showToast("Tizimdan chiqildi.", 'info');
  };

  // Darsni o'tildi deb belgilash (Ptichka ✅)
  const toggleLessonCompleted = (lessonId) => {
    setLessons(prev =>
      prev.map(l => {
        if (l.id === lessonId) {
          const newState = !l.isCompleted;
          const updated = {
            ...l,
            isCompleted: newState,
            completedAt: newState ? new Date().toISOString().replace('T', ' ').substring(0, 16) : null
          };
          showToast(newState ? `Dars o'tildi deb belgilandi! ✅` : "Dars holati bekor qilindi.", 'info');
          return updated;
        }
        return l;
      })
    );
  };

  // Yangi mavzu qo'shish
  const addLesson = (lessonData) => {
    const newLesson = {
      id: `les_${Date.now()}`,
      groupId: lessonData.groupId,
      lessonNumber: lessons.filter(l => l.groupId === lessonData.groupId).length + 1,
      date: lessonData.date || new Date().toISOString().substring(0, 10),
      time: lessonData.time || '08:30 - 10:30',
      topic: lessonData.topic,
      homework: lessonData.homework || 'Berilmagan',
      isCompleted: false,
      completedAt: null,
      materials: lessonData.materials || 'dars_materiallari.pdf',
      submittedCount: 0
    };
    setLessons(prev => [...prev, newLesson]);
    showToast("Yangi dars mavzusi jadvalga qo'shildi!", 'success');
  };

  // Davomat yozish
  const recordAttendance = (date, studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [studentId]: status
      }
    }));
    showToast("Davomat saqlandi.", 'info');
  };

  // To'lov qabul qilish
  const recordPayment = (studentId, amount, method = 'Naqd pul') => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            paymentStatus: 'paid',
            overdueDays: 0,
            amountDue: 0,
            lastPaymentDate: new Date().toISOString().substring(0, 10)
          };
        }
        return s;
      })
    );

    const newPayment = {
      id: `pay_${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      groupId: student.groupId,
      groupName: student.groupName,
      month: 'Sentabr 2024',
      amount: Number(amount),
      status: 'paid',
      date: new Date().toISOString().substring(0, 10),
      method,
      receiptNumber: `QK-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setPayments(prev => [newPayment, ...prev]);
    showToast(`${student.name} to'lovi qabul qilindi. Chek: ${newPayment.receiptNumber}`, 'success');
  };

  // SMS ogohlantirish
  const sendPaymentReminder = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    showToast(`${student.parentPhone || student.phone} raqamiga to'lov eslatmasi yuborildi.`, 'info');
  };

  // Yangi imtihon va savollar qo'shish (faqat ustoz uchun javoblari bilan)
  const addExam = (examData) => {
    const newExam = {
      id: `ex_${Date.now()}`,
      title: examData.title,
      groupId: examData.groupId,
      subject: examData.subject,
      date: examData.date,
      time: examData.time || '10:00 - 12:00',
      room: examData.room || "Asosiy Zal",
      totalQuestions: Number(examData.totalQuestions) || 5,
      maxScore: Number(examData.maxScore) || 100,
      status: 'upcoming',
      teacherAnswerKey: examData.teacherAnswerKey || []
    };
    setExams(prev => [...prev, newExam]);
    showToast("Yangi imtihon va ustoz kalitlari qo'shildi!", 'success');
  };

  // Boshlang'ich holatga qaytarish
  const resetToDefault = () => {
    if (window.confirm("Barcha ma'lumotlar qayta tiklansinmi?")) {
      localStorage.clear();
      setCurrentUser(null);
      setTeachers(INITIAL_TEACHERS);
      setStudents(INITIAL_STUDENTS);
      setGroups(INITIAL_GROUPS);
      setLessons(INITIAL_LESSONS);
      setExams(INITIAL_EXAMS);
      setAttendance(INITIAL_ATTENDANCE);
      setPayments(INITIAL_PAYMENTS);
      showToast("Baza qayta tiklandi.", 'info');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        teachers,
        students,
        groups,
        lessons,
        exams,
        attendance,
        payments,
        login,
        register,
        logout,
        toggleLessonCompleted,
        addLesson,
        recordAttendance,
        recordPayment,
        sendPaymentReminder,
        addExam,
        resetToDefault,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
