ALTER TABLE capstone1_journals
  DROP COLUMN IF EXISTS author_id;

DROP TABLE IF EXISTS capstone1_users CASCADE;
