import { useState, FormEvent } from 'react';
import { ArrowLeft, Settings, Phone, Search, User, Users, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { supabase, Individual, Team } from '../lib/supabase';

type SearchResult = 
  | { type: 'individual'; data: Individual }
  | { type: 'team'; data: Team };

export default function EditPost() {
  const { t } = useLanguage();
  const { navigateTo, setEditData } = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState<{ type: 'error'; text: string } | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setResults([]);
    setHasSearched(false);

    try {
      const [individualRes, teamRes] = await Promise.all([
        supabase.from('individuals').select('*').eq('phone', phone),
        supabase.from('teams').select('*').eq('contact', phone),
      ]);

      const foundResults: SearchResult[] = [
        ...(individualRes.data || []).map(data => ({ type: 'individual' as const, data })),
        ...(teamRes.data || []).map(data => ({ type: 'team' as const, data })),
      ];

      setResults(foundResults);
      setHasSearched(true);

      if (foundResults.length === 0) {
        setMessage({ type: 'error', text: t('noPostFound') });
      } else if (foundResults.length === 1) {
        const result = foundResults[0];
        setEditData({ type: result.type, data: result.data });
        navigateTo(result.type === 'individual' ? 'individual-form' : 'team-form');
      }
    } catch (error) {
      console.error('Error searching for post:', error);
      setMessage({ type: 'error', text: t('errorSubmit') });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    setEditData({ type: result.type, data: result.data });
    navigateTo(result.type === 'individual' ? 'individual-form' : 'team-form');
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
              <Settings className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('editPostTitle')}</h2>
          </div>

          {!hasSearched || results.length === 0 ? (
            <>
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
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">{t('selectPostToEdit')}</p>
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-600 hover:bg-red-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 group-hover:bg-red-100 p-2 rounded-lg transition-colors">
                      {result.type === 'individual' ? (
                        <User className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                      ) : (
                        <Users className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">
                        {result.type === 'individual' ? result.data.name : result.data.team_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {result.type === 'individual' ? t('individualPost') : t('teamPost')} • {result.data.track}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                </button>
              ))}
              <button
                onClick={() => setHasSearched(false)}
                className="w-full text-center text-sm text-gray-500 hover:text-red-600 mt-4 transition-colors"
              >
                {t('backButton')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
