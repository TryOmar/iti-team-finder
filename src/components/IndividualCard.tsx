import { Briefcase, Code, Phone, User } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-sm border-2 border-indigo-50 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      {/* Type Badge */}
      <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
        <User className="w-3 h-3" />
        {t('individualPost')}
      </div>

      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{individual.name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
            <Briefcase className="w-4 h-4" />
            <span>{t(`track${individual.track.replace('-', '')}`)}</span>
          </div>
        </div>
        <a
          href={getWhatsAppLink(individual.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#25D366]/20 transform hover:-translate-y-1"
          title={t('contactViaWhatsApp')}
        >
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </a>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Code className="w-3 h-3" />
            {t('roles')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {individual.roles.map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {individual.skills && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <Code className="w-3 h-3" />
              {t('skills')}
            </p>
            <p className="text-sm text-gray-700 font-medium">{individual.skills}</p>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t('aboutYou')}</p>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {individual.description}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <a
            href={getWhatsAppLink(individual.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#25D366] transition-colors font-medium"
          >
            <Phone className="w-4 h-4" />
            <span>{individual.phone}</span>
          </a>
          <span className="text-[10px] text-gray-400 italic">
            {new Date(individual.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
