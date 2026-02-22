import { useState, FormEvent } from 'react';
import { ArrowLeft, Edit3, Phone, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { supabase } from '../lib/supabase';

export default function EditPost() {
  const { t } = useLanguage();
  const { navigateTo, setEditData } = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error'; text: string } | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const [individualRes, teamRes] = await Promise.all([
        supabase.from('individuals').select('*').eq('phone', phone).maybeSingle(),
        supabase.from('teams').select('*').eq('contact', phone).maybeSingle(),
      ]);

      if (individualRes.data) {
        setEditData({ type: 'individual', data: individualRes.data });
        navigateTo('individual-form');
        return;
      }

      if (teamRes.data) {
        setEditData({ type: 'team', data: teamRes.data });
        navigateTo('team-form');
        return;
      }

      setMessage({ type: 'error', text: t('noPostFound') });
    } catch (error) {
      console.error('Error searching for post:', error);
      setMessage({ type: 'error', text: t('errorSubmit') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('backButton')}</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-lg">
              <Edit3 className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('editPostTitle')}</h2>
          </div>

          <p className="text-gray-600 mb-6">{t('enterPhoneToEdit')}</p>

          {message && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                {t('phone')} <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {t('findPost')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
