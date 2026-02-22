import { Briefcase, Code, Hash, Phone, Users, Settings } from 'lucide-react';
import { Team } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import WhatsAppIcon from './WhatsAppIcon';
import MarkdownText from './MarkdownText';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const { t } = useLanguage();
  const { navigateTo, setEditData } = useNavigation();
  const { userPhone } = useAuth();

  const whatsappLink = buildWhatsAppLink(team.contact);
  const isMyPost = userPhone && userPhone === team.contact;

  const handleEdit = () => {
    setEditData({ type: 'team', data: team });
    navigateTo('team-form');
  };

  return (
    <div className={`bg-white rounded-2xl border ${isMyPost ? 'border-red-200 shadow-lg shadow-red-50/50' : 'border-gray-100'} p-6 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300 relative overflow-hidden group flex flex-col h-full ${team.status === 'closed' ? 'opacity-50 grayscale saturate-0' : ''}`}>
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-50/60 rounded-full blur-3xl group-hover:bg-emerald-100/60 transition-colors duration-500 pointer-events-none" />

      {/* Header: badge + WhatsApp */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100/50 shadow-sm">
            <Users className="w-3 h-3" />
            {t('teamPost')}
          </span>
          {isMyPost && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
              {t('language') === 'ar' ? 'منشورك' : 'MINE'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isMyPost && (
            <button
              onClick={handleEdit}
              className="group/edit flex items-center gap-2 px-3 py-2 bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow border border-gray-100 hover:border-red-200"
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
            className="bg-[#25D366] hover:bg-[#128C7E] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            title={t('contactViaWhatsApp')}
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Team Name + Track */}
      <div className="mb-5 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
          {team.team_name}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-emerald-500 bg-emerald-50/50 px-2.5 py-1 rounded-lg">
          <Briefcase className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t(`track${team.track.replace('-', '')}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 flex-1 relative z-10">
        {/* Size Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatBox
            label={t('currentSize')}
            value={String(team.current_size)}
            icon={<Hash className="w-4 h-4 text-gray-400" />}
            variant="neutral"
          />
          <StatBox
            label={t('needsMembers')}
            value={String(team.needed_members)}
            icon={<Users className="w-4 h-4 text-emerald-400" />}
            variant="emerald"
          />
        </div>

        {/* Required Roles */}
        <div>
          <SectionLabel icon={<Code className="w-3.5 h-3.5" />} label={t('requiredRoles')} />
          <div className="flex flex-wrap gap-1.5">
            {team.required_roles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white text-emerald-600 text-[11px] font-semibold rounded-lg border border-emerald-100 hover:border-emerald-200 transition-colors cursor-default"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Project Idea */}
        {team.project_idea && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:bg-white transition-colors duration-300">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">
              {t('projectIdea')}
            </span>
            <MarkdownText 
              text={team.project_idea} 
              className="text-sm text-gray-600 leading-relaxed" 
              viewMoreLabel={t('viewMore')}
              showLessLabel={t('showLess')}
            />
          </div>
        )}
      </div>
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between relative z-10">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-[#25D366] hover:text-white transition-all duration-200 font-medium"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{team.contact}</span>
        </a>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 font-medium">
            {new Date(team.created_at).toLocaleDateString()}
          </span>
          {team.status === 'closed' && (
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
              Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/** Consistent section label used across cards */
function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2 text-gray-400">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}

/** Stat box for team size / members needed */
interface StatBoxProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant: 'neutral' | 'emerald';
}

function StatBox({ label, value, icon, variant }: StatBoxProps) {
  const bgStyles = variant === 'emerald'
    ? 'bg-emerald-50/40 border-emerald-50 group-hover:bg-emerald-50/60'
    : 'bg-gray-50 border-gray-100 group-hover:bg-white';

  return (
    <div className={`p-3 rounded-xl border transition-colors duration-300 ${bgStyles}`}>
      <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">{label}</span>
      <div className="flex items-center gap-1.5 font-bold text-lg text-gray-900">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

/** Constructs a WhatsApp deep link from a phone number */
function buildWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
}
