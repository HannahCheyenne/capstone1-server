CREATE TYPE exercise_category AS ENUM (
    'Coping',
    'Breathing',
    'Grounding'
);

ALTER TABLE capstone1_exercises
    ADD COLUMN
        style exercise_category;