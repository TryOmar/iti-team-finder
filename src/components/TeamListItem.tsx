import { Briefcase, Users, Hash, Settings } from 'lucide-react';
import { Team } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import WhatsAppIcon from './WhatsAppIcon';

interface TeamListItemProps {
  team: Team;
}

export default function TeamListItem({ team }: TeamListItemProps) {
  const { t } = useLanguage();
  const { navigateTo, setEditData } = useNavigation();

  const whatsappLink = buildWhatsAppLink(team.contact);
  const userPhone = localStorage.getItem('userPhone');
  const isMyPost = userPhone && userPhone === team.contact;

  const handleEdit = () => {
    setEditData({ type: 'team', data: team });
    navigateTo('team-form');
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:shadow-emerald-50 transition-all duration-300 group flex flex-col sm:flex-row items-start sm:items-center gap-4 ${team.status === 'closed' ? 'opacity-75' : ''}`}>
      <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 w-full">
        {/* Type & Name */}
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto shrink-0 sm:min-w-[200px]">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
              {team.team_name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {t('teamPost')}
              </span>
              {team.status === 'closed' && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Closed
                </span>
              )}
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {t(`track${team.track.replace('-', '')}`)}
              </span>
            </div>
          </div>
        </div>

        {/* Roles Needed */}
        <div className="flex flex-wrap gap-1.5 flex-1 shrink min-w-0 sm:min-w-[150px]">
          {team.required_roles.slice(0, 3).map((role, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-white text-emerald-600 text-[10px] font-medium rounded-lg border border-emerald-100 whitespace-nowrap"
            >
              {role}
            </span>
          ))}
          {team.required_roles.length > 3 && (
            <span className="px-2.5 py-1 bg-white text-emerald-600 text-[10px] font-medium rounded-lg border border-emerald-100">
              +{team.required_roles.length - 3}
            </span>
          )}
        </div>

        {/* Size Stats */}
        <div className="hidden md:flex flex-1 shrink min-w-0 px-4 border-l border-gray-100 items-center gap-4">
          <div className="flex items-center gap-1.5" title={t('currentSize')}>
            <Hash className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-sm text-gray-700">{team.current_size}</span>
          </div>
          <div className="flex items-center gap-1.5" title={t('needsMembers')}>
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm text-gray-700">{team.needed_members}</span>
            <span className="text-xs text-gray-500 font-medium ml-0.5">{t('needsMembers')}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-transparent border-gray-100">
        <span className="text-xs text-gray-400 hidden sm:block">
          {new Date(team.created_at).toLocaleDateString()}
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
