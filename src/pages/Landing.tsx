import { Users, UserPlus, Edit3, List, GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';

export default function Landing() {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block bg-red-50 p-4 rounded-full mb-6">
            <GraduationCap className="w-16 h-16 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('appTitle')} {t('appSubtitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => navigateTo('individual-form')}
            className="group bg-white border-2 border-red-600 hover:bg-red-600 rounded-xl p-8 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-red-100 group-hover:bg-white p-4 rounded-full transition-colors">
                <UserPlus className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 group-hover:text-white transition-colors">
                {t('joinTeamButton')}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-red-50 transition-colors">
                {t('language') === 'ar'
                  ? 'سجل كفرد يبحث عن فريق'
                  : 'Register as an individual looking for a team'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigateTo('team-form')}
            className="group bg-white border-2 border-red-600 hover:bg-red-600 rounded-xl p-8 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-red-100 group-hover:bg-white p-4 rounded-full transition-colors">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 group-hover:text-white transition-colors">
                {t('findMembersButton')}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-red-50 transition-colors">
                {t('language') === 'ar'
                  ? 'سجل فريقك للبحث عن أعضاء'
                  : 'Register your team to find members'}
              </p>
            </div>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigateTo('listings')}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <List className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-900">{t('viewListings')}</span>
          </button>

          <button
            onClick={() => navigateTo('edit')}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Edit3 className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-900">{t('editPostButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
