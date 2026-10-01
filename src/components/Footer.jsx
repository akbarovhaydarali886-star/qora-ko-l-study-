import React from 'react';
import { GraduationCap, Phone, MapPin, Mail, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-base">QORAKO'L ZIYO</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              O'zbekistonning eng ilg'or matematika va aniq fanlar o'quv markazi hamda zamonaviy boshqaruv platformasi.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Kurslarimiz</h4>
            <ul className="space-y-2">
              <li>Prezident maktabiga tayyorgarlik</li>
              <li>Al-Xorazmiy olimpiada matematikasi</li>
              <li>DTM & Milliy sertifikat fizika</li>
              <li>IELTS 7.5+ & Academic English</li>
              <li>Kimyo & Biologiya (Tibbiyot)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">CRM Bo'limlari</h4>
            <ul className="space-y-2">
              <li>Ustozlar kabineti (Jadval & ptichkalar)</li>
              <li>O'quvchilar reytingi & ballari</li>
              <li>Davomat monitoringi</li>
              <li>Oylik to'lovlar & qarzdorlik nazorati</li>
              <li>Rahbar paneli (Oybek - 7788)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Aloqa & Manzil</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toshkent sh., Yunusobod tumani, 4-mavze</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+998 90 123 45 67 / +998 71 200 00 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@qorakol-ziyo.uz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} Qorako'l Ziyo Ta'lim Markazi. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4">
            <span>Maxfiylik siyosati</span>
            <span>Foydalanish shartlari</span>
            <span className="text-amber-400 font-semibold">Premium Boshqaruv: Oybek (7788)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
