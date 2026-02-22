import { useState, useEffect } from 'react';
import { supabase, Individual, Team } from '../lib/supabase';
import IndividualCard from './IndividualCard';
import TeamCard from './TeamCard';

interface ListingsGridProps {
  limit?: number;
}

export default function ListingsGrid({ limit }: ListingsGridProps) {
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

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

  const combinedListings = [
    ...individuals.map(item => ({ ...item, type: 'individual' as const })),
    ...teams.map(item => ({ ...item, type: 'team' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const displayedListings = limit ? combinedListings.slice(0, limit) : combinedListings;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (displayedListings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No listings found
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedListings.map(item => 
        item.type === 'individual' ? (
          <IndividualCard key={item.id} individual={item as Individual} />
        ) : (
          <TeamCard key={item.id} team={item as Team} />
        )
      )}
    </div>
  );
}
