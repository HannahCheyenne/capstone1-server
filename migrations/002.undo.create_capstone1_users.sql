ALTER TABLE capstone1_journals
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS capstone1_users CASCADE;
