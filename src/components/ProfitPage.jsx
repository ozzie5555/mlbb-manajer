// src/components/ProfitPage.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import SimpleConfirmModal from './SimpleConfirmModal';

export default function ProfitPage({ session }) {
  const [soldAccounts, setSoldAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchSoldAccounts();
  }, []);

  useEffect(() => {
    filterByMonth();
  }, [soldAccounts, selectedMonth]);

  const fetchSoldAccounts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('game_accounts')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', 'sold')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sold accounts:', error);
      setSoldAccounts([]);
    } else {
      setSoldAccounts(data);
      extractMonths(data);
    }
    setLoading(false);
  };

  const extractMonths = (data) => {
    const months = new Set();
    data.forEach(acc => {
      const date = new Date(acc.purchase_date || acc.created_at);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthYear);
    });
    setAvailableMonths(Array.from(months).sort().reverse());
  };

  const filterByMonth = () => {
    let filtered = soldAccounts;

    if (selectedMonth !== 'all') {
      filtered = soldAccounts.filter(acc => {
        const date = new Date(acc.purchase_date || acc.created_at);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return monthYear === selectedMonth;
      });
    }

    setFilteredAccounts(filtered);
    const total = filtered.reduce((sum, acc) => sum + (acc.sell_price - acc.buy_price), 0);
    setTotalProfit(total);

    // Generate chart data
    generateChartData(filtered);
  };

  const generateChartData = (accounts) => {
    if (accounts.length === 0) {
      setChartData([]);
      return;
    }

    // Sort by date
    const sorted = [...accounts].sort((a, b) => {
      const dateA = new Date(a.purchase_date || a.created_at);
      const dateB = new Date(b.purchase_date || b.created_at);
      return dateA - dateB;
    });

    // Calculate cumulative profit
    let cumulativeProfit = 0;
    const data = sorted.map((acc, index) => {
      const profit = acc.sell_price - acc.buy_price;
      cumulativeProfit += profit;
      
      const date = new Date(acc.purchase_date || acc.created_at);
      const label = date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short' 
      });

      return {
        name: label,
        profit: cumulativeProfit,
        individual: profit,
        index: index + 1
      };
    });

    setChartData(data);
  };

  const handleClearProfit = async () => {
    const { error } = await supabase
      .from('game_accounts')
      .delete()
      .eq('user_id', session.user.id)
      .eq('status', 'sold');

    if (error) {
      console.error('Error clearing profit:', error);
      alert('Gagal menghapus data: ' + error.message);
    } else {
      await fetchSoldAccounts();
      alert('✅ Semua data profit berhasil dihapus!');
    }
    setShowClearConfirm(false);
  };

  const isProfitPositive = totalProfit >= 0;

  const formatMonthYear = (monthYear) => {
    if (monthYear === 'all') return 'Semua Periode';
    const [year, month] = monthYear.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-base font-bold text-white">
                Laporan Profit
              </h1>
              {!loading && (
                <p className={`text-sm font-bold mt-0.5 ${isProfitPositive ? 'text-red-500' : 'text-gray-400'}`}>
                  {isProfitPositive ? '📈 +' : '📉 -'} Rp{Math.abs(totalProfit).toLocaleString('id-ID')}
                </p>
              )}
              {loading && (
                <p className="text-xs text-gray-400 animate-pulse">Memuat...</p>
              )}
            </div>
            {soldAccounts.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            )}
          </div>

          {/* Filter Bulan */}
          {!loading && availableMonths.length > 0 && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-2 bg-black border border-zinc-800 text-white rounded-lg text-xs font-medium focus:outline-none focus:border-red-600"
            >
              <option value="all">📅 Semua Periode</option>
              {availableMonths.map(month => (
                <option key={month} value={month}>
                  📊 {formatMonthYear(month)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Summary Card */}
      {!loading && filteredAccounts.length > 0 && (
        <div className="px-3 pt-3">
          <div className={`${isProfitPositive ? 'bg-red-950/30 border-red-900/50' : 'bg-zinc-900 border-zinc-800'} border rounded-xl p-4 mb-3`}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 mb-2">
                <span className="text-2xl">{isProfitPositive ? '💰' : '📉'}</span>
              </div>
              <p className="text-gray-300 text-xs mb-1">
                {selectedMonth === 'all' ? 'Total Terjual' : formatMonthYear(selectedMonth)}
              </p>
              <p className="text-3xl font-bold text-white mb-2">{filteredAccounts.length}</p>
              <div className="h-px bg-zinc-800 mb-2"></div>
              <p className="text-gray-300 text-xs mb-0.5">Total Profit</p>
              <p className={`text-2xl font-bold ${isProfitPositive ? 'text-red-500' : 'text-gray-400'}`}>
                {isProfitPositive ? '+' : '-'} Rp{Math.abs(totalProfit).toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Chart Section */}
          {chartData.length > 0 && (
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Grafik Profit</h3>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${isProfitPositive ? 'bg-red-950/50 text-red-500' : 'bg-zinc-800 text-gray-400'}`}>
                  {isProfitPositive ? '📈 Naik' : '📉 Turun'}
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isProfitPositive ? "#dc2626" : "#71717a"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={isProfitPositive ? "#dc2626" : "#71717a"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#71717a" 
                      style={{ fontSize: '10px' }}
                      tick={{ fill: '#71717a' }}
                    />
                    <YAxis 
                      stroke="#71717a" 
                      style={{ fontSize: '10px' }}
                      tick={{ fill: '#71717a' }}
                      tickFormatter={(value) => `${value >= 0 ? '+' : ''}${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181b', 
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      labelStyle={{ color: '#a1a1aa' }}
                      itemStyle={{ color: '#dc2626' }}
                      formatter={(value, name) => {
                        if (name === 'profit') {
                          return [`Rp${value.toLocaleString('id-ID')}`, 'Kumulatif'];
                        }
                        return value;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke={isProfitPositive ? "#dc2626" : "#71717a"} 
                      strokeWidth={2}
                      fill="url(#colorProfit)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isProfitPositive ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                  <span className="text-xs text-gray-400">Profit Kumulatif</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Daftar Akun Sold */}
      <div className="px-3">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
            <p className="text-gray-400 mt-3 text-sm">Memuat data...</p>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-900 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-400 mb-1 text-sm">
              {selectedMonth === 'all' 
                ? 'Belum ada yang terjual' 
                : `Kosong di ${formatMonthYear(selectedMonth)}`
              }
            </p>
            {selectedMonth === 'all' && (
              <p className="text-gray-600 text-xs">Tandai stok sebagai "Sold"</p>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-1 h-5 bg-red-600 rounded-full"></div>
              <h2 className="text-xs font-semibold text-gray-300">
                Riwayat {selectedMonth !== 'all' && formatMonthYear(selectedMonth)}
              </h2>
            </div>
            {filteredAccounts.map(acc => {
              const profit = acc.sell_price - acc.buy_price;
              const isPositive = profit >= 0;
              const profitPercent = acc.buy_price > 0 
                ? ((profit / acc.buy_price) * 100).toFixed(1) 
                : 0;

              return (
                <div 
                  key={acc.id} 
                  className="bg-zinc-900 rounded-xl border border-zinc-800 p-3"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm mb-0.5">{acc.country_level}</h3>
                      <p className="text-xs text-gray-400 mb-0.5">ID: {acc.mlbb_id || '—'}</p>
                      {acc.purchase_date && (
                        <p className="text-xs text-gray-500">
                          {new Date(acc.purchase_date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${isPositive ? 'text-red-500' : 'text-gray-400'}`}>
                        {isPositive ? '+' : '-'} Rp{Math.abs(profit).toLocaleString('id-ID')}
                      </span>
                      <p className={`text-xs font-semibold mt-0.5 ${isPositive ? 'text-red-600' : 'text-gray-500'}`}>
                        ({isPositive ? '+' : ''}{profitPercent}%)
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-zinc-800">
                    <div className="bg-black/50 p-2 rounded-lg">
                      <p className="text-xs text-gray-400 mb-0.5">Beli</p>
                      <p className="text-xs font-semibold text-white">Rp{acc.buy_price?.toLocaleString('id-ID') || '0'}</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded-lg">
                      <p className="text-xs text-gray-400 mb-0.5">Jual</p>
                      <p className="text-xs font-semibold text-white">Rp{acc.sell_price?.toLocaleString('id-ID') || '0'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Clear */}
      {showClearConfirm && (
        <SimpleConfirmModal
          isOpen={showClearConfirm}
          title="Hapus Semua Data Profit"
          message="Yakin ingin menghapus SEMUA riwayat penjualan? Data yang dihapus tidak bisa dikembalikan!"
          onConfirm={handleClearProfit}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
} 