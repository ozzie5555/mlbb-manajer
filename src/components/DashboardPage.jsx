// src/components/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AddAccountModal from './AddAccountModal';
import EditAccountModal from './EditAccountModal';
import ConfirmModal from './ConfirmModal';
import Sidebar from './Sidebar';

export default function DashboardPage({ session, onSwitchToProfit, onAboutClick, onOrderClick }) {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data, error } = await supabase
      .from('game_accounts')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching accounts:', error);
    } else {
      setAccounts(data);
    }
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedAccountId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedAccountId) return;

    const { error } = await supabase
      .from('game_accounts')
      .update({ status: 'sold' })
      .eq('id', selectedAccountId)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error marking as sold:', error);
      alert('Gagal menandai sebagai terjual: ' + error.message);
    } else {
      await fetchAccounts();
      onSwitchToProfit();
    }

    setShowConfirm(false);
    setSelectedAccountId(null);
  };

  const confirmLoss = async () => {
    if (!selectedAccountId) return;

    // Get account data untuk set sell_price = 0 (rugi total)
    const account = accounts.find(acc => acc.id === selectedAccountId);
    
    if (account) {
      const { error } = await supabase
        .from('game_accounts')
        .update({ 
          status: 'sold',
          sell_price: 0 // Set harga jual = 0 (rugi penuh modal)
        })
        .eq('id', selectedAccountId)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error marking as loss:', error);
        alert('Gagal menandai sebagai rugi: ' + error.message);
      } else {
        await fetchAccounts();
        onSwitchToProfit();
      }
    }

    setShowConfirm(false);
    setSelectedAccountId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddAccount = () => {
    fetchAccounts();
  };

  const handleUpdateAccount = () => {
    fetchAccounts();
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Sidebar */}
      <Sidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)}
        onLogout={handleLogout}
        onAboutClick={() => {
          setShowSidebar(false);
          onAboutClick();
        }}
        onOrderClick={() => {
          setShowSidebar(false);
          onOrderClick();
        }}
      />

      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Hamburger Menu */}
              <button
                onClick={() => setShowSidebar(true)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-base font-bold text-white">
                  MLBB Manager
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">{accounts.length} Akun Tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 pt-3">
        {accounts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-900 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-gray-400 text-sm">Belum ada stok</p>
            <p className="text-gray-600 text-xs mt-1">Tap tombol + untuk tambah</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {accounts.map(acc => {
              const profit = acc.sell_price - acc.buy_price;
              const isProfitPositive = profit >= 0;

              return (
                <div 
                  key={acc.id} 
                  className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
                >
                  <div className="p-3">
                    {/* Header dengan Foto */}
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <div 
                        className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => acc.image_url && setZoomedImage(acc.image_url)}
                      >
                        {acc.image_url ? (
                          <img 
                            src={acc.image_url} 
                            alt="Akun" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48?text=ML";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <span className="text-lg">🎮</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm mb-0.5 truncate">{acc.country_level || '—'}</h3>
                        <p className="text-xs text-gray-400 truncate">ID: {acc.mlbb_id || '—'}</p>
                        {acc.purchase_date && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(acc.purchase_date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                      <div className="bg-black/50 border border-zinc-800 p-2 rounded-lg">
                        <p className="text-xs text-gray-400 mb-0.5">Beli</p>
                        <p className="text-white font-semibold text-xs">
                          Rp{acc.buy_price?.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="bg-black/50 border border-zinc-800 p-2 rounded-lg">
                        <p className="text-xs text-gray-400 mb-0.5">Jual</p>
                        <p className="text-white font-semibold text-xs">
                          Rp{acc.sell_price?.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Profit */}
                    <div className={`${isProfitPositive ? 'bg-red-950/30 border-red-900/50' : 'bg-zinc-800/50 border-zinc-700'} border rounded-lg p-2 mb-2`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Est. Profit</span>
                        <span className={`text-sm font-bold ${isProfitPositive ? 'text-red-500' : 'text-gray-400'}`}>
                          {isProfitPositive ? '+' : '-'} Rp{Math.abs(profit).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(acc)}
                        className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(acc.id)}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Terjual
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg transition z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Modal Zoom Image */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-10 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed" 
              className="w-full h-auto rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          title="Status Akun"
          message="Pilih status akun ini:"
          onConfirm={confirmDelete}
          onLoss={confirmLoss}
          onCancel={() => {
            setShowConfirm(false);
            setSelectedAccountId(null);
          }}
        />
      )}

      {showModal && (
        <AddAccountModal
          session={session}
          onClose={() => setShowModal(false)}
          onAdd={handleAddAccount}
        />
      )}

      {showEditModal && (
        <EditAccountModal
          session={session}
          account={selectedAccount}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAccount(null);
          }}
          onUpdate={handleUpdateAccount}
        />
      )}
    </div>
  );
}