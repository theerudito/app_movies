INSERT
INTO Login (username, password)
VALUES ('BOSS',
        'o0XiGAcpJHHZB88iSma6Bvpxt8hmwmUxtwtpljK/+jWhZg==');

INSERT
INTO gender (gender_name)
VALUES ('DRAMA'),
       ('COMEDIA'),
       ('ACCION'),
       ('TERROR'),
       ('ROMANCE'),
       ('CIENCIA_FICCION'),
       ('FANTASIA'),
       ('DOCUMENTAL'),
       ('ANIMACION'),
       ('AVENTURA'),
       ('MISTERIO'),
       ('MUSICAL'),
       ('CRIMEN'),
       ('THRILLER'),
       ('HISTORIA'),
       ('GUERRA'),
       ('FAMILIAR'),
       ('BIOGRAFIA'),
       ('WESTERN'),
       ('DEPORTES'),
       ('NOIR'),
       ('SUSPENSO'),
       ('EROTICO'),
       ('CORTO'),
       ('REALITY'),
       ('INFANTIL'),
       ('SUPERNATURAL'),
       ('POLITICO'),
       ('RELIGIOSO'),
       ('EXPERIMENTAL');

INSERT
INTO season (season_name)
VALUES ('TEMPORADA 1'),
       ('TEMPORADA 2'),
       ('TEMPORADA 3'),
       ('TEMPORADA 4'),
       ('TEMPORADA 5'),
       ('TEMPORADA 6'),
       ('TEMPORADA 7'),
       ('TEMPORADA 8'),
       ('TEMPORADA 9'),
       ('TEMPORADA 10'),
       ('TEMPORADA 11'),
       ('TEMPORADA 12'),
       ('TEMPORADA 13'),
       ('TEMPORADA 14'),
       ('TEMPORADA 15');

INSERT
INTO storage (file_name, url, extension)
VALUES ('1',  'http://127.0.0.1:5000/api/v1/images/cover1.jpg', '.png'),
       ('2',  'http://127.0.0.1:5000/api/v1/videos/cap1.mp4',   '.mp4'),
       ('3',  'http://127.0.0.1:5000/api/v1/images/cover2.jpg', '.png'),
       ('4',  'http://127.0.0.1:5000/api/v1/videos/cap1.mp4',   '.mp4'),
       ('5',  'http://127.0.0.1:5000/api/v1/videos/cap2.mp4',   '.mp4');

INSERT
INTO movie (movie_title,
            movie_year,
            cover_id,
            video_id,
            gender_id)
VALUES ('MAN OF HONOR',
        2000,
        1,
        2,
        1);

INSERT
INTO content_type (content_title,
                   content_type,
                   cover_id,
                   content_year,
                   gender_id)
VALUES ('JUJUTSU KAISEN',
        1,
        3,
        2023,
        1);

INSERT
INTO episode (episode_number,
              episode_name,
              video_id,
              season_id,
              content_id)
VALUES (1,
        'Capitulo 1',
        4,
        1,
        1),
       (2,
        'Capitulo 2',
        5,
        1,
        1);