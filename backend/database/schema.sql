CREATE TABLE repositories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE releases (
  id SERIAL PRIMARY KEY,
  repository_id INT REFERENCES repositories(id),
  version TEXT NOT NULL,
  release_date TIMESTAMP,
  seen BOOLEAN DEFAULT FALSE
);
