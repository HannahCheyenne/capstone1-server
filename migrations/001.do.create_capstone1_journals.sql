CREATE TABLE capstone1_journals (
  id SERIAL PRIMARY KEY,
  mood TEXT NOT NULL,
  content TEXT,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_modified TIMESTAMPTZ
);