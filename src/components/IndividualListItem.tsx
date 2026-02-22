import { Briefcase, User, Settings } from 'lucide-react';
import { Individual } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import WhatsAppIcon from './WhatsAppIcon';
import MarkdownText from './MarkdownText';

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
    <div className={`bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:shadow-blue-50 transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center gap-4 ${individual.status === 'closed' ? 'opacity-60 grayscale-[0.6] saturate-50 bg-gray-50/50' : ''}`}>
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
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100/50">
                {t('individualPost')}
              </span>
              {isMyPost && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100">
                  <div className="w-1 h-1 rounded-full bg-red-500" />
                  {t('language') === 'ar' ? 'منشورك' : 'MINE'}
                </span>
              )}
              <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 ml-1">
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
          <MarkdownText 
            text={individual.description} 
            className="text-sm text-gray-500" 
            maxLength={100}
            viewMoreLabel={t('viewMore')}
            showLessLabel={t('showLess')}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-transparent border-gray-100">
        <div className="flex flex-col items-end gap-1">
          {individual.status === 'closed' && (
            <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.2em] bg-red-50 px-2 py-0.5 rounded border border-red-100 flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              Closed
            </span>
          )}
          <span className="text-xs text-gray-400 hidden sm:block">
            {new Date(individual.created_at).toLocaleDateString()}
          </span>
        </div>
        {isMyPost && (
          <button
            onClick={handleEdit}
            className="group/edit flex items-center gap-2 px-3 py-2 bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-gray-100 hover:border-red-200 shadow-sm hover:shadow"
            title={t('editPostButton')}
          >
            <Settings className="w-4 h-4 group-hover/edit:rotate-90 transition-transform duration-500" />
            <span className="text-xs font-bold">{t('language') === 'ar' ? 'تعديل' : 'Edit'}</span>
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
