package handlers

import (
	"database/sql"
	"errors"

	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/theerudito/peliculas/models/entities"

	db "github.com/theerudito/peliculas/database"
	"github.com/theerudito/peliculas/helpers"
	"github.com/theerudito/peliculas/models/dto"
)

func GetMovie(c *fiber.Ctx) error {

	var (
		movies []dto.MovieDTO
		movie  dto.MovieDTO
		conn   = db.GetDB()
		rows   *sql.Rows
		err    error
	)

	rows, err = conn.Query(`
		SELECT
			m.movie_id,
			m.movie_title,
			m.movie_year,
			i.url,
			v.url,
			g.gender_id,
			g.gender_name
		FROM movie AS m
			INNER JOIN gender AS g ON m.gender_id = g.gender_id
			INNER JOIN storage AS i ON m.cover_id = i.storage_id
    		INNER JOIN storage AS v ON m.video_id = v.storage_id`)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "Error al ejecutar la consulta")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&movie.MovieId,
			&movie.Title,
			&movie.Year,
			&movie.UrlCover,
			&movie.UrlVideo,
			&movie.GenderId,
			&movie.Gender)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "movie", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		movies = append(movies, movie)
	}

	if len(movies) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(movies)

}

func GetMovieId(c *fiber.Ctx) error {

	var (
		movie dto.MovieDTO
		conn  = db.GetDB()
		id    = c.Params("id")
		rows  *sql.Rows
		err   error
		found = false
	)

	rows, err = conn.Query(`
		SELECT
			m.movie_id,
			m.movie_title,
			m.movie_year,
			i.url,
			v.url,
			g.gender_id,
			g.gender_name
		FROM movie AS m
			INNER JOIN gender AS g ON m.gender_id = g.gender_id
			INNER JOIN storage AS i ON m.cover_id = i.storage_id
    		INNER JOIN storage AS v ON m.video_id = v.storage_id
		WHERE m.movie_id = $1`, id)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "Error al ejecutar la consulta")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&movie.MovieId,
			&movie.Title,
			&movie.Year,
			&movie.UrlCover,
			&movie.UrlVideo,
			&movie.GenderId,
			&movie.Gender,
		)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "movie", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		found = true
	}

	if !found {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(movie)

}

func GetFindMovie(c *fiber.Ctx) error {

	var (
		movies []dto.MovieDTO
		movie  dto.MovieDTO
		conn   = db.GetDB()
		rows   *sql.Rows
		err    error
	)

	value := helpers.QuitarGuiones(c.Params("value"))
	search := "%" + strings.ToUpper(value) + "%"

	rows, err = conn.Query(`
		SELECT
			m.movie_id,
			m.movie_title,
			m.movie_year,
			i.url,
			v.url,
			g.gender_id,
			g.gender_name
		FROM movie AS m
			INNER JOIN gender AS g ON m.gender_id = g.gender_id
			INNER JOIN storage AS i ON m.cover_id = i.storage_id
    		INNER JOIN storage AS v ON m.video_id = v.storage_id
		WHERE m.movie_title LIKE $1`, search)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "Error al ejecutar la consulta")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&movie.MovieId,
			&movie.Title,
			&movie.Year,
			&movie.UrlCover,
			&movie.UrlVideo,
			&movie.GenderId,
			&movie.Gender)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "movie", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		movies = append(movies, movie)

	}

	if len(movies) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(movies)

}

func PostMovie(c *fiber.Ctx) error {
	var (
		movieID          int
		conn             = db.GetDB()
		exist            int
		err              error
		movie            entities.Movie
		tx               *sql.Tx
		coverId, videoId int
	)

	if err = c.BodyParser(&movie); err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "Cuerpo de solicitud inválido")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	qMovie := `SELECT COUNT(*) FROM movie WHERE movie_title = $1`
	err = conn.QueryRow(qMovie, strings.ToUpper(movie.Title)).Scan(&exist)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error ejecutando la consulta "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error ejecutando la consulta"})
	}

	if exist > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "el registro ya existe"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	// INSERT COVER
	coverId, err = helpers.StorageManager(dto.StorageItemDTO{Option: "INSERT", FileName: uuid.New().String(), Url: movie.UrlCover, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error insertando el cover "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando el cover"})
	}

	// INSERT VIDEO
	videoId, err = helpers.StorageManager(dto.StorageItemDTO{Option: "INSERT", FileName: uuid.New().String(), Url: movie.UrlVideo, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error insertando el video "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando el video"})
	}

	err = tx.QueryRow(`
		INSERT INTO movie (
			movie_title,
			movie_year,
			cover_id,
			video_id,
			gender_id
		) VALUES ($1, $2, $3, $4, $5)
		RETURNING movie_id`,
		strings.ToUpper(movie.Title),
		movie.Year,
		coverId,
		videoId,
		movie.GenderId).Scan(&movieID)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error insertando el registro "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando el registro"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "INSERT", "movie", movieID, "registro creado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "registro creado correctamente"})

}

func PutMovie(c *fiber.Ctx) error {
	var (
		movieID, coverID, videoID int
		conn                      = db.GetDB()
		err                       error
		movie                     entities.Movie
		tx                        *sql.Tx
	)

	if err = c.BodyParser(&movie); err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "Cuerpo de solicitud inválido")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	qMovie := `SELECT movie_id, video_id, cover_id FROM movie WHERE movie_id = $1`
	err = conn.QueryRow(qMovie, movie.MovieId).Scan(&movieID, &videoID, &coverID)
	if err != nil {

		if errors.Is(err, sql.ErrNoRows) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "registro no existe"})
		}

		_ = helpers.InsertLogsError(conn, "movie", "error ejecutando la consulta "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error ejecutando la consulta"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	// UPDATE COVER
	_, err = helpers.StorageManager(dto.StorageItemDTO{Option: "UPDATE", StorageId: coverID, FileName: uuid.New().String(), Url: movie.UrlCover, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error actualizando el cover "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error actualizando el cover"})
	}

	// UPDATE VIDEO
	_, err = helpers.StorageManager(dto.StorageItemDTO{Option: "UPDATE", StorageId: videoID, FileName: uuid.New().String(), Url: movie.UrlVideo, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error actualizando el video "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error actualizando el video"})
	}

	_, err = tx.Exec(`
		UPDATE movie 
		SET movie_title = $1,
			movie_year 	= $2,
			gender_id 	= $3
		WHERE movie_id 	= $4`,
		strings.ToUpper(movie.Title),
		movie.Year,
		movie.GenderId,
		movie.MovieId)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error actualizando el registro "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error actualizando el registro"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "UPDATE", "movie", movie.MovieId, "registro actualizado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "registro actualizado correctamente"})
}

func DeleteMovie(c *fiber.Ctx) error {

	var (
		coverID, videoID, movieID int
		conn                      = db.GetDB()
		err                       error
		tx                        *sql.Tx
	)

	id, _ := strconv.Atoi(c.Params("id"))

	qMovie := `SELECT movie_id, cover_id, video_id FROM movie WHERE movie_id = $1`
	err = conn.QueryRow(qMovie, id).Scan(&movieID, &coverID, &videoID)

	if err != nil {

		if errors.Is(err, sql.ErrNoRows) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "registro no existe"})
		}

		_ = helpers.InsertLogsError(conn, "movie", "error ejecutando la consulta "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error ejecutando la consulta"})

	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	// DELETE COVER
	_, err = helpers.StorageManager(dto.StorageItemDTO{Option: "DELETE", StorageId: coverID, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error eliminando el cover "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error eliminando el cover"})
	}

	// DELETE VIDEO
	_, err = helpers.StorageManager(dto.StorageItemDTO{Option: "DELETE", StorageId: videoID, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error eliminando el video "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error eliminando el video"})
	}

	dMovie := `DELETE FROM movie WHERE movie_id = $1`
	_, err = tx.Exec(dMovie, movieID)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error eliminando el registro "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error eliminando el registro"})
	}

	err = helpers.InsertLogs(tx, "DELETE", "movie", id, "registro eliminado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "registro eliminado correctamente"})

}
