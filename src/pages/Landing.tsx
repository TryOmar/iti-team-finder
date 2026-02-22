import { UserPlus, Users, Settings, GraduationCap } from 'lucide-react';
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-50 to-rose-50 rounded-3xl mb-6 shadow-sm">
            <GraduationCap className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('appTitle')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
              {t('appSubtitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-3xl mx-auto">
          <ActionCard
            icon={<UserPlus className="w-8 h-8" />}
            title={t('joinTeamButton')}
            subtitle={
              t('language') === 'ar'
                ? 'سجل كفرد يبحث عن فريق'
                : 'Register as an individual looking for a team'
            }
            variant="indigo"
            onClick={() => navigateTo('individual-form')}
          />
          <ActionCard
            icon={<Users className="w-8 h-8" />}
            title={t('findMembersButton')}
            subtitle={
              t('language') === 'ar'
                ? 'سجل فريقك للبحث عن أعضاء'
                : 'Register your team to find members'
            }
            variant="rose"
            onClick={() => navigateTo('team-form')}
          />
        </div>

        {/* Listings Section */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {t('viewListings')}
              </h3>
              <p className="text-gray-400 text-sm">
                {t('language') === 'ar'
                  ? 'استكشف الأفراد والفرق المتاحة'
                  : 'Explore available individuals and teams'}
              </p>
            </div>

            <button
              onClick={() => navigateTo('edit')}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <Settings className="w-4 h-4" />
              <span>{t('editPostButton')}</span>
            </button>
          </div>

          <ListingsGrid showFilters />
        </div>
      </div>
    </div>
  );
}

/** Reusable action card for the two CTA buttons */
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  variant: 'indigo' | 'rose';
  onClick: () => void;
}

function ActionCard({ icon, title, subtitle, variant, onClick }: ActionCardProps) {
  const styles = {
    indigo: {
      border: 'border-indigo-100 hover:border-indigo-300',
      iconBg: 'bg-indigo-50 group-hover:bg-indigo-100',
      iconColor: 'text-indigo-600',
      titleColor: 'text-indigo-700 group-hover:text-indigo-800',
    },
    rose: {
      border: 'border-rose-100 hover:border-rose-300',
      iconBg: 'bg-rose-50 group-hover:bg-rose-100',
      iconColor: 'text-rose-600',
      titleColor: 'text-rose-700 group-hover:text-rose-800',
    },
  };

  const s = styles[variant];

  return (
    <button
      onClick={onClick}
      className={`group bg-white border-2 ${s.border} rounded-2xl p-7 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 text-left`}
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <div className={`${s.iconBg} p-4 rounded-2xl transition-colors duration-300 ${s.iconColor}`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${s.titleColor} transition-colors mb-1.5`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
            {subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}
