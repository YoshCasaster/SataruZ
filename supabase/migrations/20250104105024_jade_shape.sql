/*
  # Fix profile constraints and character validation

  1. Changes
    - Remove duplicate profiles (keeping the latest one)
    - Add unique constraint for user_id
    - Add character validation
    
  2. Security
    - Ensure data integrity with unique profiles per user
    - Validate character selection
*/

-- First, remove duplicate profiles keeping only the most recent one
DELETE FROM profiles a USING (
  SELECT user_id, MAX(created_at) as max_date
  FROM profiles 
  GROUP BY user_id
  HAVING COUNT(*) > 1
) b
WHERE a.user_id = b.user_id 
AND a.created_at < b.max_date;

-- Now safely add the unique constraint
ALTER TABLE profiles
ADD CONSTRAINT unique_user_profile UNIQUE (user_id);

-- Create an enum for valid character IDs
DO $$ BEGIN
  CREATE TYPE valid_character AS ENUM ('kaelith', 'alyndra', 'rydan');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add check constraint for valid character_ids
ALTER TABLE profiles
ADD CONSTRAINT valid_character_id CHECK (character_id IN ('kaelith', 'alyndra', 'rydan'));