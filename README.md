# 🎓 Qorako'l Ziyo O'quv Markazi — Rasmiy Web Sayt & CRM Tizimi

Ushbu loyiha **Qorako'l Ziyo Ta'lim Markazi** uchun ishlab chiqilgan to'liq integratsiyalashgan zamonaviy **Web Sayt** va **CRM boshqaruv platformasi** hisoblanadi.

---

## 🚀 Tizimga Kirish va Akkauntlar (Login Ma'lumotlari)

Tizimda 3 xil rol mavjud bo'lib, har bir rol uchun qulay boshqaruv paneli yaratilgan:

### 1. 👑 Markaz Boshlig'i (Super Admin / Premium Foydalanuvchi)
* **Login (Username):** `oybek`
* **Parol:** `7788`
* **Imkoniyatlari:**
  * **Ustozlarni qidirish va nazorat:** Markazdagi barcha ustozlar ro'yxati, staji, reytingi, nechta faol guruhi borligi, dars o'tish ko'rsatkichlari.
  * **Moliya & Oylik To'lovlar:** Barcha o'quvchilarning sentabr oyi to'lovlari (kimlar to'lagan, kimlarniki kechikmoqda, qancha kunga kechikkan, qarz summasi).
  * **SMS Eslatma:** Qarzdor o'quvchilarning ota-onalariga 1 bosish bilan ogohlantirish yuborish.
  * **To'lov qabul qilish:** Naqd, Payme, Click, Uzum orqali kvitansiya chekini rasmiylashtirish.
  * **Guruhlar & Ptichkalar nazorati:** O'tilgan dars mavzularining dars dasturiga mosligi.
  * **Yangi guruh ochish:** Kurs, ustoz biriktirish, auditoriya va jadval belgilash.

---

### 2. 👨‍🏫 Ustozlar Paneli (Teacher Dashboard)
* **Tezkor kirish (Demo):** Rustam Mahmudov (Matematika) yoki ro'yxatdan o'tgan ustoz.
* **Login:** `rustam_ustoz` (yoki telefon raqami), **Parol:** `123456`
* **Imkoniyatlari:**
  * **Guruhlar:** O'ziga biriktirilgan guruhlar (PM-201, MAT-101 va h.k.).
  * **Dars jadvali & Ptichka tizimi:** Mavzular va uy vazifalari ro'yxati, dars o'tilgach **"Ptichka (✅ O'tildi)"** deb belgilab borish, yangi mavzu va vazifa qo'shish.
  * **Elektron Davomat:** Dars sanasini tanlash, o'quvchilarni "Keldi", "Kelmadi", "Sababli" deb qayd etish.
  * **Ball Tizimi (Motivatsiya):** O'quvchilarga faollik, uy vazifasi va olimpiada uchun ballar berish (+10, +30, +50, +100) va maxsus animatsion rag'batlantirish.
  * **Imtihonlar ro'yxati va ketma-ketligi:** 1-oylik saralash, oraliq nazorat, blok testlar ketma-ketligi va yangi imtihon belgilash.
  * **Ustozlar ichki reytingi:** Barcha ustozlar bilan o'zaro reyting (ball, o'quvchilar soni, davomat ko'rsatkichi).
  * **O'quvchilar to'lovlari:** O'z guruhidagi kimlar to'lagani va kimlarniki kechikayotganini ko'rish hamda to'lov qabul qilish.

---

### 3. 🎓 O'quvchilar Paneli (Student Dashboard)
* **Tezkor kirish (Demo):** Azizbek Yusupov (1-o'rin, 1250 ball)
* **Login:** `azizbek` (yoki telefon raqami), **Parol:** `123456`
* **Imkoniyatlari:**
  * **Dars jadvali, mavzu va uy vazifalari:** Bugungi mavzu, uyga berilgan topshiriqlar, o'tilgan darslar arxivi.
  * **Mening Ballarim & Yutuqlarim:** To'plangan ballar, erishilgan unvonlar ("Olimpiada Qiroli", "A'lochi", "Mantiq Ustasi") va oxirgi ballar tarixi.
  * **Sinf / Guruh Reytingi:** Sinfdoshlar orasida 1, 2, 3-o'rinlar shohsupasi va o'z o'rni.
  * **Imtihonlar ro'yxati:** Yaqinlashayotgan imtihon kuni, soati, xonasi va o'tgan test natijalari.
  * **Oylik To'lov Holati:** Joriy oy to'langanligi yoki qarzdorlik haqida ogohlantirish, to'lov kvitansiyalari, onlayn to'lash imkoniyati.

---

## 🌐 Web Sayt (Landing Page) Bo'limlari
* **Hero Banner:** Qorako'l matematika va aniq fanlar shiori, tezkor ro'yxatdan o'tish tugmalari.
* **Kurslarimiz:** Prezident maktabiga tayyorlov, Olimpiada matematikasi, Fundamental fizika, IELTS 7.5+.
* **CRM Tizimi tushuntirish bo'limi:** Ustoz, O'quvchi va Boshliq imkoniyatlari.
* **Faxriy Ustozlar:** Oliy toifali ustozlar profillari va reytinglari.
* **Qabulga Ariza qoldirish formasi:** Bepul sinov darsiga yozilish.

---

## 🛠 Texnologiyalar
* **React 18** (Vite asosida)
* **Tailwind CSS 3** (Moslashuvchan va zamonaviy UI)
* **Lucide React** (Zamonaviy piktogrammalar)
* **Canvas-Confetti** (Yutuqlar va ballar uchun bayramona effektlar)
* **LocalStorage State Sync** (Barcha o'zgarishlar, guruhlar, to'lovlar va ptichkalar brauzerda avtomatik saqlanib qoladi)

---

## 💻 Loyihani Ishga Tushirish

```bash
# Paketlarni o'rnatish (o'rnatilgan bo'lsa shart emas):
npm install

# Dasturchi rejimida ishga tushirish:
npm run dev

# Ishlab chiqarish (Production) uchun yig'ish:
npm run build
```
Brauzerda: `http://localhost:3000` manzilida ochiladi.
