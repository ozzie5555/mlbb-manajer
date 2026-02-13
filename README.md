# 📱 MLBB Account Manager Dashboard

> **Platform Manajemen Inventaris & Keuangan untuk Reseller Akun Mobile Legends**

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_Vite_Supabase-blue)

## 🧐 Latar Belakang Masalah (The Problem)

Dalam bisnis jual-beli akun game (khususnya Mobile Legends), tantangan terbesar yang sering dihadapi adalah **manajemen data yang berantakan**. 

* Data akun sering tercecer di berbagai catatan atau chat WhatsApp.
* Sulit melacak stok akun yang masih tersedia vs yang sudah terjual.
* Tidak ada rekap otomatis mengenai **Profit & Loss** (Untung/Rugi) bulanan.
* Screenshot/bukti akun sering hilang di galeri HP.

Project ini dibuat untuk menyelesaikan masalah tersebut dengan menyediakan **Sistem Dashboard Terpusat**.

---

## 🚀 Solusi & Fitur Utama

Web aplikasi ini dirancang untuk memudahkan manajemen bisnis reseller akun secara profesional dan kolaboratif.

### 📊 1. Analytics Dashboard (Crypto-Style)
Visualisasi keuntungan bulanan dengan diagram interaktif mirip chart *trading crypto*. Memudahkan pemantauan arus kas dan performa penjualan secara real-time.

### 💰 2. Profit & Loss Tracking
Fitur otomatis untuk menghitung margin keuntungan dari setiap transaksi. Sistem mencatat harga beli (modal) dan harga jual untuk kalkulasi laba bersih.

### 📂 3. Manajemen Inventaris Akun
* **CRUD System:** Tambah, Edit, dan Hapus data akun dengan mudah.
* **Gallery Integration:** Setiap entry akun dilengkapi fitur upload foto/screenshot spesifikasi akun (Skin, Winrate, dll).
* **Status Tracking:** Label otomatis untuk akun `Ready`, `Booked`, atau `Sold`.

### 🔐 4. Secure Authentication
Halaman Login yang aman menggunakan **Supabase Auth**, memastikan hanya admin (saya dan partner) yang bisa mengakses data sensitif dan keuangan.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

Project ini dibangun menggunakan teknologi web modern untuk performa yang cepat dan skalabilitas tinggi.

* **Frontend:** [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Super fast build tool)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Responsive & Modern UI)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL Database & Authentication)
* **Deployment:** [Netlify](https://www.netlify.com/)

---

## 💻 Cara Menjalankan Project (Local Development)

Ikuti langkah ini jika ingin menjalankan project di komputer lokal:

**1. Clone Repository**
```bash
git clone [https://github.com/ozzie5555/mlbb-manajer.git](https://github.com/ozzie5555/mlbb-manajer.git)
cd mlbb-manajer

```

**2. Install Dependencies**

```bash
npm install

```

**3. Konfigurasi Environment Variable**
Buat file `.env` di root folder dan isi dengan kredensial Supabase kamu:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```

**4. Jalankan Aplikasi**

```bash
npm run dev

```

Buka browser dan akses `http://localhost:5173`.

---

## 🤝 Kontribusi

Project ini dikembangkan oleh **Ozzie** untuk keperluan manajemen bisnis pribadi. Kritik dan saran sangat terbuka melalui [Issues](https://www.google.com/search?q=https://github.com/ozzie5555/mlbb-manajer/issues).

---

© 2024 MLBB Manager. All Rights Reserved.

```