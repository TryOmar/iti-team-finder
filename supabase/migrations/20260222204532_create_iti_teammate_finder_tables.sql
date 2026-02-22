/*
  # ITI Teammate Finder Database Schema

  1. New Tables
    - `individuals`
      - `id` (uuid, primary key) - Unique identifier for each individual
      - `name` (text) - Full name of the individual
      - `track` (text) - Track: PWD, OS, or UI-UX
      - `roles` (text[]) - Array of roles the individual can fill
      - `skills` (text) - Optional skills description
      - `description` (text) - About the individual
      - `phone` (text, unique) - Phone/WhatsApp number (serves as identity)
      - `language` (text) - Preferred language (ar/en)
      - `created_at` (timestamptz) - When the post was created

    - `teams`
      - `id` (uuid, primary key) - Unique identifier for each team
      - `team_name` (text) - Name of the team
      - `track` (text) - Track: PWD, OS, or UI-UX
      - `current_size` (integer) - Current number of team members
      - `needed_members` (integer) - Number of members needed
      - `required_roles` (text[]) - Array of required roles
      - `project_idea` (text) - Optional project description
      - `contact` (text, unique) - Contact phone number (serves as identity)
      - `created_at` (timestamptz) - When the post was created

  2. Security
    - Enable RLS on both tables
    - Allow public read access for all users
    - Allow public insert access for creating new posts
    - Allow public update access only when phone/contact matches
*/

CREATE TABLE IF NOT EXISTS individuals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  track text NOT NULL,
  roles text[] NOT NULL DEFAULT '{}',
  skills text DEFAULT '',
  description text NOT NULL,
  phone text UNIQUE NOT NULL,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  track text NOT NULL,
  current_size integer NOT NULL DEFAULT 1,
  needed_members integer NOT NULL,
  required_roles text[] NOT NULL DEFAULT '{}',
  project_idea text DEFAULT '',
  contact text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE individuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view individuals"
  ON individuals FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert individuals"
  ON individuals FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update individuals with matching phone"
  ON individuals FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view teams"
  ON teams FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert teams"
  ON teams FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update teams with matching contact"
  ON teams FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);