// src/components/AboutPage.jsx
export default function AboutPage({ onBack }) {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-base font-bold text-white">About Website</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-4 overflow-hidden">
            <img 
              src="https://files.catbox.moe/j631os.jpg" 
              alt="MLBB Manager Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback jika gambar gagal load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-3xl items-center justify-center hidden">
              <span className="text-4xl">🎮</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">MLBB Manager</h2>
          <p className="text-gray-400 text-sm">Solusi Manajemen Akun Mobile Legends</p>
        </div>

        {/* Why Section */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Mengapa Website Ini Dibangun?</h3>
          </div>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>
              <span className="text-red-500 font-semibold">MLBB Manager</span> dibuat untuk membantu para penjual akun Mobile Legends dalam mengelola stok mereka dengan lebih efisien dan terorganisir.
            </p>
            <p>
              Sebelumnya, banyak seller yang kesulitan mencatat akun mana yang sudah terjual, berapa profit yang didapat, dan menghitung total pendapatan mereka.
            </p>
            <p>
              Dengan aplikasi ini, semua data tersimpan rapi di database, bisa diakses kapan saja, dan memudahkan tracking bisnis akun game Anda.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Fitur Utama</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Manajemen Stok:</span> Tambah, edit, dan hapus akun dengan mudah
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Tracking Profit:</span> Lihat total keuntungan dan riwayat penjualan
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Upload Foto:</span> Dokumentasi akun dengan gambar
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Filter Bulan:</span> Analisis profit per periode
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Negosiasi Harga:</span> Edit harga jual setelah nego dengan buyer
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Teknologi</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/50 border border-zinc-800 p-2 rounded-lg">
              <p className="text-xs text-gray-400 mb-0.5">Frontend</p>
              <p className="text-sm font-semibold text-white">React + Vite</p>
            </div>
            <div className="bg-black/50 border border-zinc-800 p-2 rounded-lg">
              <p className="text-xs text-gray-400 mb-0.5">Styling</p>
              <p className="text-sm font-semibold text-white">Tailwind CSS</p>
            </div>
            <div className="bg-black/50 border border-zinc-800 p-2 rounded-lg">
              <p className="text-xs text-gray-400 mb-0.5">Database</p>
              <p className="text-sm font-semibold text-white">Supabase</p>
            </div>
            <div className="bg-black/50 border border-zinc-800 p-2 rounded-lg">
              <p className="text-xs text-gray-400 mb-0.5">Hosting</p>
              <p className="text-sm font-semibold text-white">Netlify</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-red-950/30 to-zinc-900 rounded-xl border border-red-900/50 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0121 12a11.955 11.955 0 01-1.382 5.016m-13.236 0A11.955 11.955 0 015 12c0-1.657.337-3.235.942-4.672m0 9.344a11.956 11.956 0 003.058 3.328m0-13.344a11.956 11.956 0 00-3.058 3.328m13.236 0a11.956 11.956 0 013.058 3.328m-13.236 9.344A11.956 11.956 0 0012 21c1.355 0 2.662-.224 3.877-.632" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Misi Kami</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Membuat bisnis trading akun game menjadi lebih profesional, terorganisir, dan menguntungkan dengan tools yang simple namun powerful.
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Dashboard
        </button>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-600">
            Made with ❤️ for MLBB Sellers
          </p>
          <p className="text-xs text-gray-700 mt-1">
            © 2025 MLBB Manager
          </p>
        </div>
      </div>
    </div>
  );
}