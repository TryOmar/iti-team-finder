import { Briefcase, User, Settings } from 'lucide-react';
import { Individual } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import WhatsAppIcon from './WhatsAppIcon';

interface IndividualListItemProps {
  individual: Individual;
}

export default function IndividualListItem({ individual }: IndividualListItemProps) {
  const { t } = useLanguage();
  const { navigateTo, setEditData } = useNavigation();
  const { userPhone } = useAuth();

  const whatsappLink = buildWhatsAppLink(individual.phone);
  const isMyPost = userPhone && userPhone === individual.phone;

  const handleEdit = () => {
    setEditData({ type: 'individual', data: individual });
    navigateTo('individual-form');
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:shadow-blue-50 transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center gap-4 ${individual.status === 'closed' ? 'opacity-75' : ''}`}>
      <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 w-full">
        {/* Type & Name */}
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto shrink-0 sm:min-w-[200px]">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {individual.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {t('individualPost')}
              </span>
              {individual.status === 'closed' && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Closed
                </span>
              )}
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {t(`track${individual.track.replace('-', '')}`)}
              </span>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="flex flex-wrap gap-1.5 flex-1 shrink min-w-0 sm:min-w-[150px]">
          {individual.roles.slice(0, 3).map((role, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded-lg border border-gray-100 whitespace-nowrap"
            >
              {role}
            </span>
          ))}
          {individual.roles.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded-lg border border-gray-100">
              +{individual.roles.length - 3}
            </span>
          )}
        </div>

        {/* About Preview */}
        <div className="hidden md:block flex-1 shrink min-w-0 px-4 border-l border-gray-100">
          <p className="text-sm text-gray-500 truncate" title={individual.description}>
            {individual.description}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-transparent border-gray-100">
        <span className="text-xs text-gray-400 hidden sm:block">
          {new Date(individual.created_at).toLocaleDateString()}
        </span>
        {isMyPost && (
          <button
            onClick={handleEdit}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 border border-gray-100"
            title="Edit Post"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-50 hover:bg-[#25D366] text-gray-600 hover:text-white w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-sm font-medium border border-gray-100 hover:border-transparent"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span className="sm:hidden">{t('contactViaWhatsApp')}</span>
        </a>
      </div>
    </div>
  );
}

function buildWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
}
