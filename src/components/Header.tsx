import { GraduationCap, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-rose-500 p-2 rounded-xl">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{t('appTitle')}</h1>
              <p className="text-xs text-gray-400 font-medium">{t('appSubtitle')}</p>
            </div>
          </button>

          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-600"
          >
            <Languages className="w-4 h-4" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
