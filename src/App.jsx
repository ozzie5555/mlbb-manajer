// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ProfitPage from './components/ProfitPage';
import AboutPage from './components/AboutPage';
import OrderPage from './components/OrderPage';

export default function App() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAbout, setShowAbout] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const switchToProfit = () => {
    setActiveTab('profit');
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <LoginPage />;
  }

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />;
  }

  if (showOrder) {
    return <OrderPage onBack={() => setShowOrder(false)} />;
  }

  return (
    <>
      {activeTab === 'dashboard' ? (
        <DashboardPage 
          session={session} 
          onSwitchToProfit={switchToProfit}
          onAboutClick={() => setShowAbout(true)}
          onOrderClick={() => setShowOrder(true)}
        />
      ) : (
        <ProfitPage session={session} />
      )}

      {/* Bottom Navigation - Black & Red */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-20">
        <div className="flex items-center justify-around px-3 py-2.5">
          <button
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-xs font-semibold">Stok</span>
          </button>

          <button
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'profit' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('profit')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-semibold">Profit</span>
          </button>
        </div>
      </div>
    </>
  );
}