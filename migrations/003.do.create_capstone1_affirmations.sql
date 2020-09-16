CREATE TABLE capstone1_affirmations (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES capstone1_users(id) ON DELETE CASCADE NOT NULL
);
