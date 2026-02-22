import { Briefcase, Code, Phone, User, ExternalLink } from 'lucide-react';
import { Individual } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

interface IndividualCardProps {
  individual: Individual;
}

export default function IndividualCard({ individual }: IndividualCardProps) {
  const { t } = useLanguage();

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-7 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 relative overflow-hidden group flex flex-col h-full">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-500" />
      
      {/* Type Badge - More subtle */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <User className="w-3 h-3" />
          {t('individualPost')}
        </div>
        <a
          href={getWhatsAppLink(individual.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 transform hover:-translate-y-1 group/wa"
          title={t('contactViaWhatsApp')}
        >
          <WhatsAppIcon className="w-6 h-6 text-white group-hover/wa:scale-110 transition-transform" />
        </a>
      </div>

      <div className="mb-6 relative z-10">
        <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {individual.name}
        </h3>
        <div className="flex items-center gap-2 text-indigo-500 bg-indigo-50/50 w-fit px-3 py-1 rounded-lg">
          <Briefcase className="w-4 h-4 font-bold" />
          <span className="text-sm font-bold uppercase tracking-wide">
            {t(`track${individual.track.replace('-', '')}`)}
          </span>
        </div>
      </div>

      <div className="space-y-6 flex-1 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-3 text-gray-400">
            <Code className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t('roles')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {individual.roles.map((role, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 bg-white text-indigo-600 text-[11px] font-bold rounded-xl border border-indigo-100 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-default"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {individual.skills && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Code className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t('skills')}</span>
            </div>
            <p className="text-sm text-gray-700 font-semibold leading-relaxed pl-6 border-l-2 border-indigo-100">
              {individual.skills}
            </p>
          </div>
        )}

        <div className="bg-gray-50/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors duration-300">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">
            {t('aboutYou')}
          </span>
          <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed font-medium">
            {individual.description}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
        <a
          href={getWhatsAppLink(individual.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-[#25D366] hover:text-white transition-all duration-300 font-bold group/phone"
        >
          <Phone className="w-4 h-4 group-hover/phone:rotate-12 transition-transform" />
          <span>{individual.phone}</span>
        </a>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            {new Date(individual.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

