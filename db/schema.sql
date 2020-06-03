DROP DATABASE IF EXISTS resources_db;

CREATE DATABASE resources_db;
\c resources_db;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  abbrev TEXT,
  contributor TEXT,
  description TEXT,
  level TEXT,
  link TEXT,
  topic TEXT
);

/*
COPY resources (abbrev, contributor, description, level, link, topic) FROM '/Users/nsb52/mvp/hr_data.20200514.a.csv' DELIMITER ',' CSV HEADER;
Heroku:
\COPY resources (abbrev, contributor, description, level, link, topic) FROM '/Users/nsb52/mvp/hr_data.20200514.a.csv' DELIMITER ',' CSV HEADER;
DELETE FROM resources * where id > 159;
ALTER SEQUENCE resources_id_seq RESTART 160;
TRUNCATE resources;
ALTER SEQUENCE resources_id_seq RESTART 1;
*/
