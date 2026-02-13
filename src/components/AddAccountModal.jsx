// src/components/AddAccountModal.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddAccountModal({ session, onClose, onAdd }) {
  const [countryLevel, setCountryLevel] = useState('');
  const [emailAccount, setEmailAccount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    let imageUrl = null;

    try {
      if (imageFile) {
        setUploadProgress(30);
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('mlbb-images')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error('Gagal upload gambar: ' + uploadError.message);
        }

        setUploadProgress(60);

        const { data: { publicUrl } } = supabase.storage
          .from('mlbb-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      setUploadProgress(80);

      const newAccount = {
        user_id: session.user.id,
        country_level: countryLevel.trim(),
        mlbb_id: emailAccount.trim(),
        buy_price: parseInt(buyPrice) || 0,
        sell_price: parseInt(sellPrice) || 0,
        purchase_date: purchaseDate,
        image_url: imageUrl,
        status: 'available'
      };

      const { error: insertError } = await supabase
        .from('game_accounts')
        .insert([newAccount]);

      if (insertError) {
        throw new Error('Gagal menyimpan: ' + insertError.message);
      }

      setUploadProgress(100);

      onAdd();
      onClose();

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto border border-red-900/30">
        {/* Header */}
        <div className="p-3 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h2 className="text-sm font-bold text-white">Tambah Akun Baru</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          {/* Upload Gambar */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Foto Akun</label>
            {!imagePreview ? (
              <label className="border-2 border-dashed border-zinc-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-red-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-400">Klik untuk upload</span>
                <span className="text-xs text-gray-600 mt-0.5">PNG, JPG max 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            ) : (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5"
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Deskripsi Stok */}
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

          {/* Email Akun */}
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

          {/* Tanggal Beli */}
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

          {/* Harga Beli */}
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

          {/* Harga Jual */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Harga Jual (Rp)</label>
            <input
              type="number"
              placeholder="200000"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-zinc-800 text-white text-sm rounded-lg focus:outline-none focus:border-red-600"
              required
              disabled={loading}
            />
          </div>

          {/* Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="bg-black rounded-lg p-3">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
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
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}