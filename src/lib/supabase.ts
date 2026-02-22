import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Individual {
  id: string;
  name: string;
  track: string;
  roles: string[];
  skills: string;
  description: string;
  phone: string;
  language: string;
  created_at: string;
  status?: string;
}

export interface Team {
  id: string;
  team_name: string;
  track: string;
  current_size: number;
  needed_members: number;
  required_roles: string[];
  project_idea: string;
  contact: string;
  created_at: string;
  status?: string;
}
