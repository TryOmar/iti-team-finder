import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users,
  UserPlus,
  Phone,
  Briefcase,
  Code,
  Hash,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { supabase, Individual, Team } from '../lib/supabase';

const tracks = ['PWD', 'OS', 'UI-UX'];
const roles = [
  'roleFrontend',
  'roleBackend',
  'roleFullstack',
  'roleUIUX',
  'roleMobile',
  'roleDevOps',
  'roleQA',
];

export default function Listings() {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'individuals' | 'teams'>('individuals');
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const [trackFilter, setTrackFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [individualsRes, teamsRes] = await Promise.all([
        supabase.from('individuals').select('*').order('created_at', { ascending: false }),
        supabase.from('teams').select('*').order('created_at', { ascending: false }),
      ]);

      if (individualsRes.data) setIndividuals(individualsRes.data);
      if (teamsRes.data) setTeams(teamsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIndividuals = individuals.filter(individual => {
    if (trackFilter && individual.track !== trackFilter) return false;
    if (roleFilter && !individual.roles.includes(roleFilter)) return false;
    return true;
  });

  const filteredTeams = teams.filter(team => {
    if (trackFilter && team.track !== trackFilter) return false;
    if (roleFilter && !team.required_roles.includes(roleFilter)) return false;
    return true;
  });

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('backButton')}</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => setActiveTab('individuals')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'individuals'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              {t('individualsTab')}
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'teams'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              {t('teamsTab')}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4" />
                {t('filterByTrack')}
              </label>
              <select
                value={trackFilter}
                onChange={e => setTrackFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('allTracks')}</option>
                {tracks.map(track => (
                  <option key={track} value={track}>
                    {t(`track${track.replace('-', '')}`)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Code className="w-4 h-4" />
                {t('filterByRole')}
              </label>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('allRoles')}</option>
                {roles.map(role => (
                  <option key={role} value={t(role)}>
                    {t(role)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'individuals' &&
              filteredIndividuals.map(individual => (
                <div
                  key={individual.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{individual.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{t(`track${individual.track.replace('-', '')}`)}</span>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppLink(individual.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition-colors"
                      title={t('contactViaWhatsApp')}
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </a>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                        <Code className="w-3 h-3" />
                        {t('roles')}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {individual.roles.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {individual.skills && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          {t('skills')}
                        </p>
                        <p className="text-sm text-gray-700">{individual.skills}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">{t('aboutYou')}</p>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {individual.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <a
                        href={getWhatsAppLink(individual.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{individual.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === 'teams' &&
              filteredTeams.map(team => (
                <div
                  key={team.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{team.team_name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{t(`track${team.track.replace('-', '')}`)}</span>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppLink(team.contact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition-colors"
                      title={t('contactViaWhatsApp')}
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </a>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Hash className="w-4 h-4" />
                        <span>
                          {team.current_size} {t('membersCount')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600 font-medium">
                        <Users className="w-4 h-4" />
                        <span>
                          {t('needsMembers')} {team.needed_members}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                        <Code className="w-3 h-3" />
                        {t('requiredRoles')}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {team.required_roles.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {team.project_idea && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          {t('projectIdea')}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-3">{team.project_idea}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-100">
                      <a
                        href={getWhatsAppLink(team.contact)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{team.contact}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === 'individuals' && filteredIndividuals.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No individuals found
              </div>
            )}

            {activeTab === 'teams' && filteredTeams.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No teams found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
