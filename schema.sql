DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(100),
    formatted_query VARCHAR(100),
    latitude float,
    longitude float
);

