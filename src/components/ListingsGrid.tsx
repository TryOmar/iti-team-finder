import { useState, useEffect } from 'react';
import { Briefcase, Code, SlidersHorizontal, X } from 'lucide-react';
import { supabase, Individual, Team } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import IndividualCard from './IndividualCard';
import TeamCard from './TeamCard';

const TRACKS = ['PWD', 'OS', 'UI-UX'];
const ROLES = [
  'roleFrontend',
  'roleBackend',
  'roleFullstack',
  'roleUIUX',
  'roleMobile',
  'roleDevOps',
  'roleQA',
];

interface ListingsGridProps {
  limit?: number;
  showFilters?: boolean;
}

export default function ListingsGrid({ limit, showFilters = false }: ListingsGridProps) {
  const { t } = useLanguage();
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackFilter, setTrackFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'individuals' | 'teams'>('all');

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
      /* Silently handle — loading state will be cleared */
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

  const getDisplayedListings = () => {
    if (activeTab === 'individuals') {
      const items = filteredIndividuals.map(item => ({ ...item, type: 'individual' as const }));
      return limit ? items.slice(0, limit) : items;
    }
    if (activeTab === 'teams') {
      const items = filteredTeams.map(item => ({ ...item, type: 'team' as const }));
      return limit ? items.slice(0, limit) : items;
    }
    return limit ? combinedListings.slice(0, limit) : combinedListings;
  };

  const displayedListings = getDisplayedListings();

  const hasActiveFilters = trackFilter || roleFilter || activeTab !== 'all';

  const clearAllFilters = () => {
    setTrackFilter('');
    setRoleFilter('');
    setActiveTab('all');
  };

  return (
    <div>
      {showFilters && (
        <div className="mb-8 space-y-4">
          {/* Tab Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="inline-flex p-1 bg-gray-100 rounded-xl">
              <TabButton
                active={activeTab === 'all'}
                label={t('allTab')}
                onClick={() => setActiveTab('all')}
                variant="neutral"
              />
              <TabButton
                active={activeTab === 'individuals'}
                label={t('individualsTab')}
                onClick={() => setActiveTab('individuals')}
                variant="blue"
              />
              <TabButton
                active={activeTab === 'teams'}
                label={t('teamsTab')}
                onClick={() => setActiveTab('teams')}
                variant="emerald"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t('language') === 'ar' ? 'مسح الفلاتر' : 'Clear filters'}</span>
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex items-center gap-2 px-3 py-2 text-gray-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={trackFilter}
                  onChange={e => setTrackFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer hover:border-gray-300"
                >
                  <option value="">{t('allTracks')}</option>
                  {TRACKS.map(track => (
                    <option key={track} value={track}>
                      {t(`track${track.replace('-', '')}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer hover:border-gray-300"
                >
                  <option value="">{t('allRoles')}</option>
                  {ROLES.map(role => (
                    <option key={role} value={t(role)}>
                      {t(role)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active filter count badge */}
          {hasActiveFilters && (
            <div className="text-sm text-gray-500">
              {t('language') === 'ar'
                ? `تم العثور على ${displayedListings.length} نتيجة`
                : `${displayedListings.length} results found`}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 border-[3px] border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-400 font-medium">
              {t('language') === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </span>
          </div>
        </div>
      ) : displayedListings.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <SlidersHorizontal className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">
              {t('language') === 'ar' ? 'لا توجد نتائج' : 'No listings found'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                {t('language') === 'ar' ? 'مسح الفلاتر' : 'Clear filters'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedListings.map(item =>
            item.type === 'individual' ? (
              <IndividualCard key={item.id} individual={item as Individual} />
            ) : (
              <TeamCard key={item.id} team={item as Team} />
            )
          )}
        </div>
      )}
    </div>
  );
}

/** Internal tab button component for clean switcher UI */
interface TabButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  variant: 'neutral' | 'blue' | 'emerald';
}

function TabButton({ active, label, onClick, variant }: TabButtonProps) {
  const activeStyles: Record<string, string> = {
    neutral: 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5',
    blue: 'bg-blue-600 text-white shadow-md shadow-blue-200',
    emerald: 'bg-emerald-600 text-white shadow-md shadow-emerald-200',
  };

  const inactiveStyle = 'text-gray-500 hover:text-gray-700 hover:bg-gray-50';

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
        active ? activeStyles[variant] : inactiveStyle
      }`}
    >
      {label}
    </button>
  );
}
