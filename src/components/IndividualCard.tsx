import { Briefcase, Code, Phone, User } from 'lucide-react';
import { Individual } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

interface IndividualCardProps {
  individual: Individual;
}

export default function IndividualCard({ individual }: IndividualCardProps) {
  const { t } = useLanguage();

  const whatsappLink = buildWhatsAppLink(individual.phone);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50/60 rounded-full blur-3xl group-hover:bg-blue-100/60 transition-colors duration-500 pointer-events-none" />

      {/* Header: badge + WhatsApp */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <User className="w-3 h-3" />
          {t('individualPost')}
        </span>
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

      {/* Name + Track */}
      <div className="mb-5 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {individual.name}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-blue-500 bg-blue-50/50 px-2.5 py-1 rounded-lg">
          <Briefcase className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {t(`track${individual.track.replace('-', '')}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 flex-1 relative z-10">
        {/* Roles */}
        <div>
          <SectionLabel icon={<Code className="w-3.5 h-3.5" />} label={t('roles')} />
          <div className="flex flex-wrap gap-1.5">
            {individual.roles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white text-blue-600 text-[11px] font-semibold rounded-lg border border-blue-100 hover:border-blue-200 transition-colors cursor-default"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        {individual.skills && (
          <div>
            <SectionLabel icon={<Code className="w-3.5 h-3.5" />} label={t('skills')} />
            <p className="text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-blue-100">
              {individual.skills}
            </p>
          </div>
        )}

        {/* About */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:bg-white transition-colors duration-300">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
            {t('aboutYou')}
          </span>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {individual.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between relative z-10">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-[#25D366] hover:text-white transition-all duration-200 font-medium"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{individual.phone}</span>
        </a>
        <span className="text-[10px] text-gray-400 font-medium">
          {new Date(individual.created_at).toLocaleDateString()}
        </span>
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

/** Constructs a WhatsApp deep link from a phone number */
function buildWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
}
