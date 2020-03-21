DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(100),
    formatted_query VARCHAR(100),
    latitude numeric(20,14),
    longitude numeric(20,14)
);

INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ('tacoma', 'tacoma', '47.2495798', '-122.4398746');

-- SELECT * FROM locations