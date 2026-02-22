CREATE DATABASE peliculas;

CREATE TABLE login
(
    user_id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    logo     TEXT
);

CREATE TABLE gender
(
    gender_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gender_name TEXT NOT NULL UNIQUE
);

CREATE TABLE season
(
    season_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    season_name TEXT NOT NULL UNIQUE
);

CREATE TABLE storage
(
    storage_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    file_name  TEXT,
    url         TEXT
);

CREATE TABLE movie
(
    movie_id    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    movie_title TEXT    NOT NULL,
    movie_year  INTEGER NOT NULL,

    cover_id    INT,
    video_id    INT,

    gender_id   INTEGER NOT NULL,

    FOREIGN KEY (gender_id) REFERENCES gender (gender_id),
    FOREIGN KEY (cover_id) REFERENCES storage (storage_id),
    FOREIGN KEY (video_id) REFERENCES storage (storage_id)
);

CREATE TABLE content_type
(
    content_id    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content_title TEXT    NOT NULL,
    content_type  INTEGER NOT NULL,
    content_year  INTEGER NOT NULL,

    cover_id      INT,

    gender_id     INTEGER NOT NULL,

    FOREIGN KEY (gender_id) REFERENCES gender (gender_id),
    FOREIGN KEY (cover_id) REFERENCES storage (storage_id)
);

CREATE TABLE episode
(
    episode_id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    episode_number INTEGER NOT NULL,
    episode_name   TEXT    NOT NULL,

    video_id       INT,

    season_id      INTEGER NOT NULL,
    content_id     INTEGER NOT NULL,

    FOREIGN KEY (season_id) REFERENCES season (season_id),
    FOREIGN KEY (content_id) REFERENCES content_type (content_id),
    FOREIGN KEY (video_id) REFERENCES storage (storage_id)
);

CREATE TABLE log_actions (
   log_actions_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   action TEXT,
   table_name TEXT,
   record_id INTEGER,
   description TEXT,
   created_at TIMESTAMP DEFAULT now ()
);

CREATE TABLE logs_error (
   logs_error_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   message TEXT,
   table_name TEXT,
   created_at TIMESTAMP DEFAULT now ()
);
