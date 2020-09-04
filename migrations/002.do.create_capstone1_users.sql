CREATE TABLE capstone1_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);

ALTER TABLE capstone1_journals
  ADD COLUMN
    user_id INTEGER REFERENCES capstone1_users(id)
    ON DELETE SET NULL;
