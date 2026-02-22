import { GraduationCap, Languages, Github, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { navigateTo } = useNavigation();
  const { isLoggedIn, logout, userPhone } = useAuth();

  const handleLogout = () => {
    logout();
    navigateTo('landing');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center relative">
          <div className="flex items-center gap-3 z-10">
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-gray-50/80 border border-gray-100 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-200 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                    {t('loggedInAs')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-extrabold text-gray-700 mt-0.5">
                    {userPhone}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-red-700 p-2 rounded-xl shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-600 tracking-tight">
              Team Finder
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-sm font-medium text-red-600"
                title={`${t('loggedInAs')} ${userPhone}`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </button>
            )}
            <a
              href="https://github.com/TryOmar/iti-team-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-600"
              title={language === 'en' ? "Open source project. Feel free to contribute or add suggestions in issues!" : "مشروع مفتوح المصدر. نرحب بمساهماتكم واقتراحاتكم!"}
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Contribute' : 'ساهم معنا'}</span>
            </a>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-600"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
