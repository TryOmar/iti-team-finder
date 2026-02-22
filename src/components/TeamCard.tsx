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
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-7 hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500 relative overflow-hidden group flex flex-col h-full">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-50 rounded-full blur-3xl group-hover:bg-red-100 transition-colors duration-500" />

      {/* Type Badge - More subtle */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Users className="w-3 h-3" />
          {t('teamPost')}
        </div>
        <a
          href={getWhatsAppLink(team.contact)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 transform hover:-translate-y-1 group/wa"
          title={t('contactViaWhatsApp')}
        >
          <WhatsAppIcon className="w-6 h-6 text-white group-hover/wa:scale-110 transition-transform" />
        </a>
      </div>

      <div className="mb-6 relative z-10">
        <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
          {team.team_name}
        </h3>
        <div className="flex items-center gap-2 text-red-500 bg-red-50/50 w-fit px-3 py-1 rounded-lg">
          <Briefcase className="w-4 h-4 font-bold" />
          <span className="text-sm font-bold uppercase tracking-wide">
            {t(`track${team.track.replace('-', '')}`)}
          </span>
        </div>
      </div>

      <div className="space-y-6 flex-1 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors duration-300">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">{t('currentSize')}</span>
            <div className="flex items-center gap-2 text-gray-900 font-black text-lg">
              <Hash className="w-5 h-5 text-gray-400" />
              <span>{team.current_size}</span>
            </div>
          </div>
          <div className="bg-red-50/30 p-4 rounded-2xl border border-red-50 group-hover:bg-red-50/50 transition-colors duration-300">
            <span className="text-[10px] font-bold text-red-400 uppercase block mb-1">{t('needsMembers')}</span>
            <div className="flex items-center gap-2 text-red-600 font-black text-lg">
              <Users className="w-5 h-5" />
              <span>{team.needed_members}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-gray-400">
            <Code className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t('requiredRoles')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {team.required_roles.map((role, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 bg-white text-red-600 text-[11px] font-bold rounded-xl border border-red-100 shadow-sm hover:border-red-300 hover:bg-red-50 transition-all cursor-default"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {team.project_idea && (
          <div className="bg-gray-50/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors duration-300">
            <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] block mb-3">
              {t('projectIdea')}
            </span>
            <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed font-medium">
              {team.project_idea}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
        <a
          href={getWhatsAppLink(team.contact)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-[#25D366] hover:text-white transition-all duration-300 font-bold group/phone"
        >
          <Phone className="w-4 h-4 group-hover/phone:rotate-12 transition-transform" />
          <span>{team.contact}</span>
        </a>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            {new Date(team.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

