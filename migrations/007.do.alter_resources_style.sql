CREATE TYPE resource_category AS ENUM (
    'Natural',
    'With-insurance',
    'No-insurance'
);

ALTER TABLE capstone1_resources
    ADD COLUMN 
        style resource_category;