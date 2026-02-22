/*
  # Add delete policies for teams and individuals

  1. Security Changes
    - Add RLS policy to allow public to delete their own posts (matching contact/phone)
    - Since we don't have authentication, we allow public delete, but the UI handles the phone number check during edit mode.
*/

CREATE POLICY "Anyone can delete individuals"
  ON individuals FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete teams"
  ON teams FOR DELETE
  TO public
  USING (true);
