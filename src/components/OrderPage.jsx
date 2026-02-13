// src/components/OrderPage.jsx
export default function OrderPage({ onBack }) {
  const telegramLink = "https://t.me/CyberOzzie"; // Ganti dengan username Telegram Anda

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
            <h1 className="text-base font-bold text-white">Order Website</h1>
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
              alt="Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback jika gambar gagal load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-3xl items-center justify-center hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Web Development Services</h2>
          <p className="text-gray-400 text-sm">Custom Website & Application Development</p>
        </div>

        {/* About Me Card */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">About Developer</h3>
          </div>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>
              Saya menekuni bidang <span className="text-red-500 font-semibold">keamanan siber</span> sejak tahun 2025 dengan fokus pada <span className="text-white font-semibold">Web Exploitation</span> melalui kegiatan CTF.
            </p>
            <p>
              Saya juga memiliki ketertarikan dan pengalaman dalam <span className="text-white font-semibold">pengembangan aplikasi web</span>, sehingga mampu memahami aplikasi web dari sisi pengembang maupun keamanannya.
            </p>
            <p>
              Fokus pembelajaran saya meliputi analisis kerentanan web, penggunaan <span className="text-red-500 font-semibold">Burp Suite</span> dan <span className="text-red-500 font-semibold">sqlmap</span>, serta pendokumentasian melalui GitHub, dengan tujuan menjadi <span className="text-white font-semibold">Web Security Specialist</span>.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Expertise</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/50 border border-zinc-800 p-2.5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Web Development</p>
              <p className="text-sm font-semibold text-white">React, Node.js</p>
            </div>
            <div className="bg-black/50 border border-zinc-800 p-2.5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Database</p>
              <p className="text-sm font-semibold text-white">Supabase, SQL</p>
            </div>
            <div className="bg-black/50 border border-zinc-800 p-2.5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Security</p>
              <p className="text-sm font-semibold text-white">Web Exploitation</p>
            </div>
            <div className="bg-black/50 border border-zinc-800 p-2.5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Tools</p>
              <p className="text-sm font-semibold text-white">Burp Suite, sqlmap</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Services Offered</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Custom Web Application</span> - Full-stack development dengan React & Node.js
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Database Integration</span> - Supabase, PostgreSQL, MySQL
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">Security Audit</span> - Analisis keamanan aplikasi web
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
              <p className="text-gray-300 text-sm flex-1">
                <span className="font-semibold text-white">UI/UX Design</span> - Modern & responsive design dengan Tailwind CSS
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-red-950/30 to-zinc-900 rounded-xl border border-red-900/50 p-4 mb-4">
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-white mb-2">Tertarik Bekerjasama?</h3>
            <p className="text-gray-300 text-sm">
              Hubungi saya untuk diskusi project website atau aplikasi Anda
            </p>
          </div>

          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
            </svg>
            Web Creation Services
          </a>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Dashboard
        </button>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-600">
            Professional Web Development & Security Services
          </p>
          <p className="text-xs text-gray-700 mt-1">
            © 2025 Your Name
          </p>
        </div>
      </div>
    </div>
  );
}