import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import ListingsGrid from '../components/ListingsGrid';

export default function Listings() {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">{t('backButton')}</span>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('viewListings')}
          </h2>
          <p className="text-gray-400">
            {t('language') === 'ar'
              ? 'استكشف وتصفّح جميع الإعلانات المتاحة'
              : 'Browse and filter all available listings'}
          </p>
        </div>

        <ListingsGrid showFilters />
      </div>
    </div>
  );
}
