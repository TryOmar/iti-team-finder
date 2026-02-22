import { UserPlus, Users, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import ListingsGrid from '../components/ListingsGrid';

export default function Landing() {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-3xl mx-auto">
          <ActionCard
            icon={<UserPlus className="w-8 h-8" />}
            title={t('joinTeamButton')}
            variant="blue"
            onClick={() => navigateTo('individual-form')}
          />
          <ActionCard
            icon={<Users className="w-8 h-8" />}
            title={t('findMembersButton')}
            variant="emerald"
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
  variant: 'blue' | 'emerald';
  onClick: () => void;
}

function ActionCard({ icon, title, variant, onClick }: ActionCardProps) {
  const styles = {
    blue: {
      border: 'border-blue-100 hover:border-blue-300',
      iconBg: 'bg-blue-50 group-hover:bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-700 group-hover:text-blue-800',
    },
    emerald: {
      border: 'border-emerald-100 hover:border-emerald-300',
      iconBg: 'bg-emerald-50 group-hover:bg-emerald-100',
      iconColor: 'text-emerald-600',
      titleColor: 'text-emerald-700 group-hover:text-emerald-800',
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
        </div>
      </div>
    </button>
  );
}
