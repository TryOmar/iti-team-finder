import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users,
  UserPlus,
  Briefcase,
  Code,
  LayoutGrid,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { supabase, Individual, Team } from '../lib/supabase';
import IndividualCard from '../components/IndividualCard';
import TeamCard from '../components/TeamCard';

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
  const [activeTab, setActiveTab] = useState<'all' | 'individuals' | 'teams'>('all');
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

  const combinedListings = [
    ...filteredIndividuals.map(item => ({ ...item, type: 'individual' as const })),
    ...filteredTeams.map(item => ({ ...item, type: 'team' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl shadow-inner max-w-fit self-center lg:self-start">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5 scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                {t('allTab')}
              </button>
              <button
                onClick={() => setActiveTab('individuals')}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'individuals'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-200/50'
                }`}
              >
                <UserPlus className="w-5 h-5" />
                {t('individualsTab')}
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'teams'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-105'
                    : 'text-gray-500 hover:text-red-600 hover:bg-gray-200/50'
                }`}
              >
                <Users className="w-5 h-5" />
                {t('teamsTab')}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 flex-1 max-w-2xl">
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
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'all' &&
              combinedListings.map(item => 
                item.type === 'individual' ? (
                  <IndividualCard key={item.id} individual={item as Individual} />
                ) : (
                  <TeamCard key={item.id} team={item as Team} />
                )
              )}

            {activeTab === 'individuals' &&
              filteredIndividuals.map(individual => (
                <IndividualCard key={individual.id} individual={individual} />
              ))}

            {activeTab === 'teams' &&
              filteredTeams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))}

            {activeTab === 'all' && combinedListings.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No listings found
              </div>
            )}

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
