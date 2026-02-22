import { GraduationCap, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-red-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
              <p className="text-sm text-red-600 font-medium">{t('appSubtitle')}</p>
            </div>
          </button>

          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Languages className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
