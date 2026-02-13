// src/components/EditAccountModal.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function EditAccountModal({ session, account, onClose, onUpdate }) {
  const [countryLevel, setCountryLevel] = useState('');
  const [emailAccount, setEmailAccount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setCountryLevel(account.country_level || '');
      setEmailAccount(account.mlbb_id || '');
      setBuyPrice(account.buy_price?.toString() || '');
      setSellPrice(account.sell_price?.toString() || '');
      setPurchaseDate(account.purchase_date || new Date().toISOString().split('T')[0]);
    }
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('game_accounts')
        .update({
          country_level: countryLevel.trim(),
          mlbb_id: emailAccount.trim(),
          buy_price: parseInt(buyPrice) || 0,
          sell_price: parseInt(sellPrice) || 0,
          purchase_date: purchaseDate
        })
        .eq('id', account.id)
        .eq('user_id', session.user.id);

      if (error) {
        throw new Error('Gagal update: ' + error.message);
      }

      onUpdate();
      onClose();

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto border border-red-900/30">
        {/* Header */}
        <div className="p-3 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h2 className="text-sm font-bold text-white">Edit Akun</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          {/* Foto Akun (Read Only) */}
          {account?.image_url && (
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Foto Akun</label>
              <img 
                src={account.image_url} 
                alt="Akun" 
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200?text=ML";
                }}
              />
              <p className="text-xs text-gray-500 mt-1">*Foto tidak bisa diubah</p>
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Deskripsi Stok</label>
            <input
              type="text"
              placeholder="Contoh: Mythic III - Indonesia"
              value={countryLevel}
              onChange={(e) => setCountryLevel(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-zinc-800 text-white text-sm rounded-lg focus:outline-none focus:border-red-600"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Level, rank, skin, hero, dll</p>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email Akun</label>
            <input
              type="email"
              placeholder="emailakun@gmail.com"
              value={emailAccount}
              onChange={(e) => setEmailAccount(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-zinc-800 text-white text-sm rounded-lg focus:outline-none focus:border-red-600"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Email untuk login akun MLBB</p>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Tanggal Beli</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-zinc-800 text-white text-sm rounded-lg focus:outline-none focus:border-red-600"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Harga Beli (Rp)</label>
            <input
              type="number"
              placeholder="150000"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-zinc-800 text-white text-sm rounded-lg focus:outline-none focus:border-red-600"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Harga Jual (Rp) 
              <span className="text-yellow-500 ml-1">⭐ Bisa dinegosiasi</span>
            </label>
            <input
              type="number"
              placeholder="200000"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-zinc-800 text-white text-sm rounded-lg focus:outline-none focus:border-red-600"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">💡 Update harga jual setelah nego</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-zinc-800 text-gray-300 text-sm rounded-lg hover:bg-zinc-800 disabled:opacity-50"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}