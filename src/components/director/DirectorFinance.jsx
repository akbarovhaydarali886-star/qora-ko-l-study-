import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  Send, 
  Plus, 
  FileSpreadsheet,
  Users,
  ShieldAlert
} from 'lucide-react';

export const DirectorFinance = () => {
  const { students, groups, payments, recordPayment, sendPaymentReminder, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'paid' | 'overdue'
  const [activePaymentModalStudent, setActivePaymentModalStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(650000);
  const [paymentMethod, setPaymentMethod] = useState('Naqd pul');

  // Moliya hisoblari
  const totalPaidRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  
  const overdueStudents = students.filter(s => s.paymentStatus === 'overdue' || s.paymentStatus === 'pending');
  const paidStudents = students.filter(s => s.paymentStatus === 'paid');

  const totalOverdueDebt = overdueStudents.reduce((acc, s) => {
    const grp = groups.find(g => g.id === s.groupId);
    return acc + (s.amountDue || grp?.fee || 650000);
  }, 0);

  // Filtrlash
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.phone.includes(searchTerm) ||
                          (student.parentPhone && student.parentPhone.includes(searchTerm));
    if (!matchesSearch) return false;

    if (filterStatus === 'paid') return student.paymentStatus === 'paid';
    if (filterStatus === 'overdue') return student.paymentStatus === 'overdue' || student.paymentStatus === 'pending';
    return true;
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!activePaymentModalStudent) return;

    recordPayment(activePaymentModalStudent.id, Number(paymentAmount), paymentMethod);
    setActivePaymentModalStudent(null);
  };

  const handleSendAllReminders = () => {
    overdueStudents.forEach(s => sendPaymentReminder(s.id));
    showToast(`Barcha ${overdueStudents.length} ta qarzdor o'quvchilar ota-onalariga SMS ogohlantirish yuborildi! 📲`, 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Financial Dashboard Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
              👑 Markaz Boshlig'i Moliya Nazorati
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              O'quv Markazi Oylik To'lovlari Balansi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Sentabr oyi tushumi, o'quvchilar qarzdorligi va to'lov monitoringi.
            </p>
          </div>

          {/* Quick action: Send all overdue reminders */}
          {overdueStudents.length > 0 && (
            <button
              onClick={handleSendAllReminders}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-2xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 self-start lg:self-center"
            >
              <Send className="w-4 h-4" />
              <span>Barcha Kechikkanlarga SMS Yuborish ({overdueStudents.length})</span>
            </button>
          )}
        </div>

        {/* Big Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Jami Tushum (Kassaga tushgan)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {totalPaidRevenue.toLocaleString()} so'm
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {paidStudents.length} nafar o'quvchi to'lagan
            </div>
          </div>

          <div className="bg-rose-500/10 backdrop-blur-md p-4 rounded-2xl border border-rose-500/20">
            <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Kechikayotgan To'lovlar (Qarzdorlik)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">
              {totalOverdueDebt.toLocaleString()} so'm
            </div>
            <div className="text-[11px] text-rose-300 mt-1">
              {overdueStudents.length} nafar o'quvchida kechikish bor
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-blue-400 font-bold flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> To'lov Intizomi
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">
              {Math.round((paidStudents.length / (students.length || 1)) * 100)}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Jami {students.length} nafar o'quvchidan
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O'quvchi ismi, telefon yoki ota-ona raqami..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Barchasi ({students.length})
          </button>
          <button
            onClick={() => setFilterStatus('paid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'paid'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            To'laganlar ({paidStudents.length})
          </button>
          <button
            onClick={() => setFilterStatus('overdue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'overdue'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Kechikayotganlar ({overdueStudents.length})
          </button>
        </div>
      </div>

      {/* Students Payments Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              O'quvchilar topilmadi
            </div>
          ) : (
            filteredStudents.map((st) => {
              const grp = groups.find(g => g.id === st.groupId);
              const isPaid = st.paymentStatus === 'paid';
              const dueAmount = st.amountDue || grp?.fee || 650000;

              return (
                <div 
                  key={st.id}
                  className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isPaid ? 'hover:bg-slate-50' : 'bg-rose-50/20 hover:bg-rose-50/40'
                  }`}
                >
                  {/* Left Student Info */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">{st.name}</h4>
                        {isPaid ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> To'langan
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            {st.overdueDays ? `${st.overdueDays} kunga kechikmoqda!` : "Qarzdorlik"}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                        <span>Guruh: <strong className="text-blue-600">{grp?.name}</strong></span>
                        <span>•</span>
                        <span>O'quvchi tel: <strong>{st.phone}</strong></span>
                        {st.parentPhone && (
                          <>
                            <span>•</span>
                            <span>Ota-ona tel: <strong>{st.parentPhone}</strong></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Status, Amount & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-4 self-end md:self-center w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                    <div className="text-right">
                      <div className={`text-base font-black ${isPaid ? 'text-slate-900' : 'text-rose-600'}`}>
                        {isPaid ? `${(grp?.fee || 650000).toLocaleString()} so'm` : `Qarz: ${dueAmount.toLocaleString()} so'm`}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isPaid && st.lastPaymentDate ? `To'langan: ${st.lastPaymentDate}` : "Sentabr 2024 to'lovi"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isPaid && (
                        <button
                          onClick={() => sendPaymentReminder(st.id)}
                          className="px-3 py-2 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                          title="Ota-onasiga SMS eslatma jo'natish"
                        >
                          <Send className="w-3.5 h-3.5 text-amber-600" />
                          <span className="hidden sm:inline">SMS</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setActivePaymentModalStudent(st);
                          setPaymentAmount(dueAmount);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isPaid
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isPaid ? "Qayta To'lov" : "To'lov Kiritish"}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal: To'lovni kiritish */}
      {activePaymentModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Kassaga To'lov Qabul Qilish
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              O'quvchi: <strong className="text-slate-800">{activePaymentModalStudent.name}</strong>
            </p>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  To'lov Miqdori (so'm)
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  To'lov Turi
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="Naqd pul">Naqd pul (Kassa)</option>
                  <option value="Payme">Payme</option>
                  <option value="Click">Click</option>
                  <option value="Uzum Bank">Uzum Bank</option>
                  <option value="Bank O'tkazmasi">Bank O'tkazmasi</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActivePaymentModalStudent(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md"
                >
                  To'lovni Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
