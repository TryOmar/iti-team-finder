import { Briefcase, Code, Hash, Phone, Users } from 'lucide-react';
import { Team } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const { t } = useLanguage();

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-red-50 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      {/* Type Badge */}
      <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
        <Users className="w-3 h-3" />
        {t('teamPost')}
      </div>

      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-red-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{team.team_name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
            <Briefcase className="w-4 h-4" />
            <span>{t(`track${team.track.replace('-', '')}`)}</span>
          </div>
        </div>
        <a
          href={getWhatsAppLink(team.contact)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#25D366]/20 transform hover:-translate-y-1"
          title={t('contactViaWhatsApp')}
        >
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </a>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-6 py-2 px-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">{t('currentSize')}</span>
            <div className="flex items-center gap-1.5 text-gray-700 font-bold">
              <Hash className="w-4 h-4 text-gray-400" />
              <span>{team.current_size}</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-red-400 uppercase">{t('needsMembers')}</span>
            <div className="flex items-center gap-1.5 text-red-600 font-bold">
              <Users className="w-4 h-4" />
              <span>{team.needed_members}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Code className="w-3 h-3" />
            {t('requiredRoles')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {team.required_roles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-100"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {team.project_idea && (
          <div className="bg-red-50/50 p-4 rounded-xl border border-red-100/50">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">{t('projectIdea')}</p>
            <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
              {team.project_idea}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <a
            href={getWhatsAppLink(team.contact)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#25D366] transition-colors font-medium"
          >
            <Phone className="w-4 h-4" />
            <span>{team.contact}</span>
          </a>
          <span className="text-[10px] text-gray-400 italic">
            {new Date(team.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
