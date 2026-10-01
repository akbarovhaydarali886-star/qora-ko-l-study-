import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send, 
  Search, 
  Filter,
  DollarSign,
  Plus
} from 'lucide-react';

export const TeacherPayments = ({ selectedGroupId }) => {
  const { students, groups, recordPayment, sendPaymentReminder } = useApp();

  const [paymentFilter, setPaymentFilter] = useState('all'); // 'all' | 'paid' | 'overdue'
  const [searchTerm, setSearchTerm] = useState('');
  const [activePaymentStudent, setActivePaymentStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(650000);
  const [paymentMethod, setPaymentMethod] = useState('Naqd pul');

  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupStudents = students.filter(s => s.groupId === currentGroup?.id);

  // Filtrlash
  const filteredStudents = groupStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.phone.includes(searchTerm);
    if (!matchesSearch) return false;

    if (paymentFilter === 'paid') return student.paymentStatus === 'paid';
    if (paymentFilter === 'overdue') return student.paymentStatus === 'overdue' || student.paymentStatus === 'pending';
    return true;
  });

  const paidCount = groupStudents.filter(s => s.paymentStatus === 'paid').length;
  const overdueCount = groupStudents.filter(s => s.paymentStatus === 'overdue' || s.paymentStatus === 'pending').length;
  const totalDueAmount = groupStudents
    .filter(s => s.paymentStatus === 'overdue' || s.paymentStatus === 'pending')
    .reduce((acc, curr) => acc + (curr.amountDue || currentGroup?.fee || 650000), 0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!activePaymentStudent) return;

    recordPayment(activePaymentStudent.id, Number(paymentAmount), paymentMethod);
    setActivePaymentStudent(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <CreditCard className="w-4 h-4" /> Moliya & To'lovlar Nazorati
          </span>
          <h2 className="text-2xl font-black">{currentGroup?.name} Oylik To'lovlari</h2>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Sentabr oyi uchun o'quvchilar to'lovlari. Kimlar to'lagan va kimlarning to'lovi kechikayotganini kuzating va to'lovlarni qabul qiling.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-center min-w-[120px]">
            <div className="text-[11px] text-emerald-300">To'laganlar</div>
            <div className="text-2xl font-black text-white mt-0.5">{paidCount} nafar</div>
          </div>
          <div className="bg-rose-500/20 backdrop-blur-md rounded-2xl p-3.5 border border-rose-400/30 text-center min-w-[120px]">
            <div className="text-[11px] text-rose-300">Kechikayotganlar</div>
            <div className="text-2xl font-black text-rose-400 mt-0.5">{overdueCount} nafar</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O'quvchini qidirish..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setPaymentFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              paymentFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Barchasi ({groupStudents.length})
          </button>
          <button
            onClick={() => setPaymentFilter('paid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              paymentFilter === 'paid'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            To'laganlar ({paidCount})
          </button>
          <button
            onClick={() => setPaymentFilter('overdue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              paymentFilter === 'overdue'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Kechikayotganlar ({overdueCount})
          </button>
        </div>
      </div>

      {/* Students Payment List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Ushbu filtr bo'yicha o'quvchilar topilmadi
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isPaid = student.paymentStatus === 'paid';
              const isOverdue = student.paymentStatus === 'overdue';

              return (
                <div
                  key={student.id}
                  className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isPaid ? 'hover:bg-slate-50' : 'bg-rose-50/20 hover:bg-rose-50/40'
                  }`}
                >
                  {/* Left Student Info */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">{student.name}</h4>
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> To'langan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            {student.overdueDays ? `${student.overdueDays} kunga kechikmoqda!` : "To'lanmagan"}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                        <span>Tel: <strong>{student.phone}</strong></span>
                        {student.parentPhone && (
                          <span>Ota-onasi: <strong>{student.parentPhone}</strong></span>
                        )}
                        {isPaid && student.lastPaymentDate && (
                          <span className="text-emerald-700">To'lov sanasi: {student.lastPaymentDate}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions & Amount */}
                  <div className="flex items-center justify-between md:justify-end gap-4 self-end md:self-center w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                    <div className="text-right">
                      <div className={`text-base font-black ${isPaid ? 'text-slate-900' : 'text-rose-600'}`}>
                        {isPaid 
                          ? `${(currentGroup?.fee || 650000).toLocaleString()} so'm` 
                          : `Qarz: ${(student.amountDue || currentGroup?.fee || 650000).toLocaleString()} so'm`}
                      </div>
                      <div className="text-[10px] text-slate-400">Sentabr 2024</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isPaid && (
                        <button
                          onClick={() => sendPaymentReminder(student.id)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                          title="Ota-onasiga SMS eslatma jo'natish"
                        >
                          <Send className="w-3.5 h-3.5 text-blue-600" />
                          <span className="hidden sm:inline">SMS Eslatma</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setActivePaymentStudent(student);
                          setPaymentAmount(student.amountDue || currentGroup?.fee || 650000);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isPaid 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isPaid ? "Qayta To'lov" : "To'lov Qabul Qilish"}</span>
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
      {activePaymentStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-1">
              To'lovni Qabul Qilish
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              O'quvchi: <strong className="text-slate-800">{activePaymentStudent.name}</strong> ({currentGroup?.name})
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
                  To'lov Usuli
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="Naqd pul">Naqd pul</option>
                  <option value="Payme">Payme</option>
                  <option value="Click">Click</option>
                  <option value="Uzum Bank">Uzum Bank</option>
                  <option value="Karta (Terminal)">Karta (Terminal)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 border border-emerald-200">
                To'lov tasdiqlangach, o'quvchi statusi avtomatik ravishda <strong>"To'langan"</strong> holatiga o'tadi va kvitansiya chek raqami yaratiladi.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActivePaymentStudent(null)}
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
