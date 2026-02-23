import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simple hardcoded admin password for MVP, ideally this should be a backend check
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    // Check if previously authenticated in this session
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchReservations();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      toast.success('Giriş başarılı');
      fetchReservations();
    } else {
      toast.error('Hatalı şifre');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
    toast.info('Çıkış yapıldı');
    navigate('/');
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/reservations`);
      if (!response.ok) throw new Error('Veriler alınamadı');
      
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      toast.error('Rezervasyonlar yüklenirken hata oluştu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reservations/${id}/status?status=${status}`, {
        method: 'PATCH',
      });
      
      if (!response.ok) throw new Error('Durum güncellenemedi');
      
      toast.success(`Rezervasyon ${status === 'confirmed' ? 'onaylandı' : 'iptal edildi'}`);
      // Refresh the list
      fetchReservations();
    } catch (error) {
      toast.error('İşlem başarısız');
      console.error(error);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Yönetici Paneli</h1>
            <p className="text-zinc-400">Devam etmek için şifrenizi girin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Yönetici Şifresi"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition-colors"
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-zinc-400 hover:text-white transition-colors py-2 text-sm"
            >
              Ana Sayfaya Dön
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-amber-500">Kenaz Cafe Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchReservations}
                className="text-zinc-300 hover:text-white transition-colors text-sm px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-800"
                disabled={loading}
              >
                {loading ? 'Yenileniyor...' : 'Yenile'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-zinc-400 hover:text-amber-500 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-light mb-2">Rezervasyonlar</h2>
            <p className="text-zinc-400">Tüm talepleri buradan yönetebilirsiniz.</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-sm uppercasse">
                  <th className="px-6 py-4 font-medium">Tarih / Saat</th>
                  <th className="px-6 py-4 font-medium">Müşteri</th>
                  <th className="px-6 py-4 font-medium">Kişi</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-zinc-500">
                      {loading ? 'Yükleniyor...' : 'Henüz rezervasyon bulunmuyor.'}
                    </td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-zinc-800/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-200">{res.date}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-zinc-400 mt-1">
                            <Clock size={12} /> {res.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{res.name}</span>
                          <span className="text-xs text-zinc-400 mt-1">{res.phone}</span>
                          <span className="text-xs text-zinc-500">{res.email}</span>
                          {res.message && (
                            <span className="text-xs text-amber-500 mt-2 bg-amber-500/10 p-1 rounded italic max-w-xs truncate" title={res.message}>
                              "{res.message}"
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-amber-500 font-semibold">
                          {res.guests}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          res.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          res.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {res.status === 'confirmed' && <CheckCircle2 size={12} />}
                          {res.status === 'cancelled' && <XCircle size={12} />}
                          {res.status === 'pending' && <Clock size={12} />}
                          {res.status === 'confirmed' ? 'Onaylandı' :
                           res.status === 'cancelled' ? 'İptal Edildi' : 'Bekliyor'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {res.status !== 'confirmed' && (
                            <button
                              onClick={() => updateStatus(res.id, 'confirmed')}
                              className="inline-flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium border border-green-500/20"
                            >
                              <CheckCircle2 size={14} /> Onayla
                            </button>
                          )}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => updateStatus(res.id, 'cancelled')}
                              className="inline-flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium border border-red-500/20"
                            >
                              <XCircle size={14} /> İptal
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
