import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Receipt, 
  Clock, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const StudentPaymentStatus = () => {
  const { currentUser, groups, recordPayment, payments } = useApp();

  const userGroup = groups.find(g => g.id === currentUser?.groupId) || groups[0];
  const isPaid = currentUser?.paymentStatus === 'paid';
  const feeAmount = userGroup?.fee || 650000;

  const [paying, setPaying] = useState(false);

  const handleOnlinePay = (method) => {
    setPaying(true);
    setTimeout(() => {
      recordPayment(currentUser.id, feeAmount, method);
      setPaying(false);
    }, 1000);
  };

  const userPayments = payments.filter(p => p.studentId === currentUser?.id);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className={`rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
        isPaid 
          ? 'bg-gradient-to-r from-emerald-900 to-teal-900' 
          : 'bg-gradient-to-r from-rose-900 to-red-950'
      }`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1 text-emerald-300">
            <CreditCard className="w-4 h-4" /> Oylik To'lov Holati
          </span>
          <h2 className="text-2xl font-black">Sentabr 2024 Oyi</h2>
          <p className="text-xs text-white/80 mt-1 max-w-lg">
            Guruh: <strong className="text-white">{userGroup?.name}</strong> | Oylik to'lov: <strong className="text-white">{feeAmount.toLocaleString()} so'm</strong>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[180px] border border-white/20">
          <div className="text-xs text-white/80">Holat:</div>
          <div className="text-xl font-black mt-0.5 flex items-center justify-center gap-1.5">
            {isPaid ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">To'langan</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span className="text-rose-300">Kechikmoqda</span>
              </>
            )}
          </div>
          <div className="text-[10px] text-white/70 mt-1">
            {isPaid ? `Sana: ${currentUser?.lastPaymentDate}` : `${currentUser?.overdueDays || 7} kun kechikkan`}
          </div>
        </div>
      </div>

      {/* Payment Action if overdue */}
      {!isPaid && (
        <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>To'lov muddati o'tgan! Qulay usulda to'lov qiling:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleOnlinePay('Payme')}
              disabled={paying}
              className="p-4 rounded-2xl border-2 border-cyan-200 bg-cyan-50/50 hover:bg-cyan-100/60 font-bold text-xs text-cyan-900 flex items-center justify-between transition-all"
            >
              <span>Payme orqali to'lash</span>
              <span className="text-cyan-700">650,000 so'm →</span>
            </button>

            <button
              onClick={() => handleOnlinePay('Click')}
              disabled={paying}
              className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 font-bold text-xs text-blue-900 flex items-center justify-between transition-all"
            >
              <span>Click orqali to'lash</span>
              <span className="text-blue-700">650,000 so'm →</span>
            </button>

            <button
              onClick={() => handleOnlinePay('Uzum Bank')}
              disabled={paying}
              className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 font-bold text-xs text-purple-900 flex items-center justify-between transition-all"
            >
              <span>Uzum Bank</span>
              <span className="text-purple-700">650,000 so'm →</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>To'lov to'g'ridan to'g'ri o'quv markazi hisob raqamiga qabul qilinadi va chek shakllanadi.</span>
          </div>
        </div>
      )}

      {/* Receipts and Payments History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-blue-600" />
          <span>To'lov Cheklari va Kvitansiyalar</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {userPayments.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              To'lov cheklari mavjud emas
            </div>
          ) : (
            userPayments.map(p => (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    🧾
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{p.month} to'lovi</div>
                    <div className="text-[11px] text-slate-500">
                      Chek raqami: <strong className="font-mono text-slate-700">{p.receiptNumber}</strong> • {p.method}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">
                    {p.amount.toLocaleString()} so'm
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    To'langan ({p.date})
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
