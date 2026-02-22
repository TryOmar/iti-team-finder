import { Users, UserPlus, Settings, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import ListingsGrid from '../components/ListingsGrid';

export default function Landing() {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 px-4">
          <div className="inline-block bg-red-50 p-4 rounded-full mb-6 shadow-sm">
            <GraduationCap className="w-16 h-16 text-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('appTitle')} <span className="text-red-600">{t('appSubtitle')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          <button
            onClick={() => navigateTo('individual-form')}
            className="group bg-white border-2 border-red-600 hover:bg-red-600 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="bg-red-50 group-hover:bg-white p-5 rounded-2xl transition-colors duration-300 shadow-inner">
                <UserPlus className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-600 group-hover:text-white transition-colors mb-2">
                  {t('joinTeamButton')}
                </h3>
                <p className="text-gray-600 group-hover:text-red-50 transition-colors">
                  {t('language') === 'ar'
                    ? 'سجل كفرد يبحث عن فريق'
                    : 'Register as an individual looking for a team'}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('team-form')}
            className="group bg-white border-2 border-red-600 hover:bg-red-600 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="bg-red-50 group-hover:bg-white p-5 rounded-2xl transition-colors duration-300 shadow-inner">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-600 group-hover:text-white transition-colors mb-2">
                  {t('findMembersButton')}
                </h3>
                <p className="text-gray-600 group-hover:text-red-50 transition-colors">
                  {t('language') === 'ar'
                    ? 'سجل فريقك للبحث عن أعضاء'
                    : 'Register your team to find members'}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Listings Preview */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('viewListings')}</h3>
              <p className="text-gray-600">Explore talented individuals and exciting projects</p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigateTo('listings')}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl transition-all shadow-sm font-medium text-gray-700"
              >
                <span>{t('viewListings')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('edit')}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all font-semibold border border-red-100"
              >
                <Settings className="w-4 h-4" />
                <span>{t('editPostButton')}</span>
              </button>
            </div>
          </div>
          
          <ListingsGrid limit={6} />
          
          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('listings')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-bold text-lg"
            >
              <span>{t('viewListings')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
