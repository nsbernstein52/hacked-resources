DROP DATABASE IF EXISTS resources_db;

CREATE DATABASE resources_db;
\c resources_db;

CREATE TABLE resources_legacy (
  id SERIAL PRIMARY KEY,
  abbrev TEXT,
  contributor TEXT,
  description TEXT,
  level TEXT,
  link TEXT,
  topic TEXT
);


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
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  affiliation TEXT,
  email TEXT
);

CREATE TABLE resources_contributors (
  resource_contributor_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id),
  contributor_id INT REFERENCES users(user_id)
);

CREATE TABLE topics (
  topic_id SERIAL PRIMARY KEY,
  topic TEXT,
  abbrev TEXT
);

CREATE TABLE resources_topics (
  resource_topic_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id),
  topic_id INT REFERENCES topics(topic_id)
);

*/

/* INSERT seeding */

/*
INSERT INTO resourcesflat (contributor, description, level, link, topic) VALUES ('Neil the snail', 'a test description', 'All', 'http:#www.tbd.com', 'Test topic');
*/

/* INSERT seeding */
/*
INSERT INTO resources (description, level, link) VALUES ("a test description", "All", "http:#www.tbd.com");
*/

/*
INSERT INTO users (first_name, last_name, affiliation, email) VALUES ("Neil", "Snail", "bld08", "thesnail@tbd.com");
INSERT INTO resources_users VALUES (1, 1);

INSERT INTO topics (topic, abbrev) VALUES ("aaaTestTopic", "aTT");
INSERT INTO resources_topics VALUES (1, 1);
*/

/*
SELECT QUERY seeding
SELECT * FROM resources;
SELECT * FROM users;
SELECT * from topics;
*/

/*
SELECT topics.topic, topics.abbrev, resources.level, resources.link, resources.description, users.first_name, users.lastname, users.email
FROM resources
INNER JOIN topics ON resources.resource_id = ...
*/

/*
CREATE TABLE yys (
  yy_id SERIAL PRIMARY KEY,
  yy TEXT
);

CREATE TABLE xxs_yys (
  xx_yy_id SERIAL PRIMARY KEY,
  xx_id INT REFERENCES xxs(xx_id),
  yy_id INT REFERENCES yys(yy_id)
);
*/

/*
CREATE TABLE apis (
  api_id SERIAL PRIMARY KEY,
  api TEXT
);

CREATE TABLE resources_apis (
  resource_api_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id)
  api_id INT REFERENCES apis(api_id),
);


CREATE TABLE apps (
  app_id SERIAL PRIMARY KEY,
  app TEXT
);

CREATE TABLE resources_apps (
  resource_app_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id),
  app_id INT REFERENCES apps(app_id)
);


CREATE TABLE relatedresources (
  relatedresource_id SERIAL PRIMARY KEY,
  relatedresource TEXT
);

CREATE TABLE resources_relatedresources (
  resource_relatedresource_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id),
  relatedresource_id INT REFERENCES relatedresources(relatedresource_id)
);



CREATE TABLE sprints (
  sprint_id SERIAL PRIMARY KEY,
  sprint TEXT
);

CREATE TABLE resources_sprints (
  resource_sprint_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id),
  sprint_id INT REFERENCES sprints(sprint_id)
);


CREATE TABLE subresources (
  subresource_id SERIAL PRIMARY KEY,
  subresource TEXT
);

CREATE TABLE resources_subresources (
  resource_subresource_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resource_id),
  subresource_id INT REFERENCES rsubresources(subresource_id)
);


CREATE TABLE tags (
  tag_id SERIAL PRIMARY KEY,
  tag TEXT
);

CREATE TABLE resources_tags (
  resource_tag_id SERIAL PRIMARY KEY,
  resource_id INT REFERENCES resources(resources_id),
  tag_id INT REFERENCES tags(tags_id)
);

CREATE TABLE yys (
  yy_id SERIAL PRIMARY KEY,
  yy TEXT
);

CREATE TABLE xxs_yys (
  xx_yy_id SERIAL PRIMARY KEY,
  xx_id INT REFERENCES xxs(xx_id),
  yy_id INT REFERENCES yys(yy_id)
);

*/