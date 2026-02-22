package handlers

import (
	"database/sql"
	"errors"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	db "github.com/theerudito/peliculas/database"
	"github.com/theerudito/peliculas/helpers"
	"github.com/theerudito/peliculas/models/dto"
	"github.com/theerudito/peliculas/models/entities"
)

func GetContent(c *fiber.Ctx) error {

	var (
		obj  []dto.ContentDTO
		conn = db.GetDB()
		rows *sql.Rows
		err  error
	)

	rows, err = conn.Query(`
	SELECT
		c.content_id,
		c.content_title,
		c.content_year,
		g.gender_id,
		g.gender_name,
		s.url,
		CASE
		WHEN c.content_type = 1 
		THEN 'ANIME'
		ELSE 'SERIE'
		END AS type
	FROM content_type c
		LEFT JOIN gender AS g ON g.gender_id = c.gender_id
		LEFT JOIN storage AS s ON s.storage_id = c.cover_id`)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		var content dto.ContentDTO
		err = rows.Scan(
			&content.ContentId,
			&content.Title,
			&content.Year,
			&content.GenderId,
			&content.Gender,
			&content.UrlCover,
			&content.Type)

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		obj = append(obj, content)
	}

	if len(obj) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(obj)

}

func GetContentId(c *fiber.Ctx) error {

	var (
		obj   dto.ContentDTO
		conn  = db.GetDB()
		rows  *sql.Rows
		id    = c.Params("id")
		err   error
		found = false
	)

	rows, err = conn.Query(`
	SELECT
		c.content_id,
		c.content_title,
		c.content_year,
		g.gender_id,
		g.gender_name,
		s.url,
		CASE
		WHEN c.content_type = 1 
		THEN 'ANIME'
		ELSE 'SERIE'
		END AS type
	FROM content_type c
		INNER JOIN gender AS g ON g.gender_id = c.gender_id
		INNER JOIN storage AS s ON s.storage_id = c.cover_id
	WHERE c.content_id = $1`, id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&obj.ContentId,
			&obj.Title,
			&obj.Year,
			&obj.GenderId,
			&obj.Gender,
			&obj.UrlCover,
			&obj.Type)

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		found = true
	}

	if !found {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(obj)

}

func GetFindContent(c *fiber.Ctx) error {

	var (
		obj     []dto.ContentDTO
		content dto.ContentDTO
		id      = c.Params("id")
		conn    = db.GetDB()
		rows    *sql.Rows
		err     error
	)

	value := helpers.QuitarGuiones(c.Params("value"))

	search := "%" + strings.ToUpper(value) + "%"

	rows, err = conn.Query(`
	SELECT
		c.content_id,
		c.content_title,
		c.content_year,
		g.gender_id,
		g.gender_name,
		s.url,
		CASE
		WHEN c.content_type = 1 
		THEN 'ANIME'
		ELSE 'SERIE'
		END AS type
	FROM content_type c
		INNER JOIN gender AS g ON g.gender_id = c.gender_id
		INNER JOIN storage AS s ON s.storage_id = c.cover_id
	WHERE c.content_title LIKE $1 AND c.content_type = $2`, search, id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&content.ContentId,
			&content.Title,
			&content.Year,
			&content.GenderId,
			&content.Gender,
			&content.UrlCover,
			&content.Type)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		obj = append(obj, content)
	}

	if len(obj) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(obj)
}

func GetContentType(c *fiber.Ctx) error {

	var (
		obj     []dto.ContentDTO
		content dto.ContentDTO
		id      = c.Params("id")
		conn    = db.GetDB()
		rows    *sql.Rows
		err     error
	)

	rows, err = conn.Query(`
	SELECT
		c.content_id,
		c.content_title,
		c.content_year,
		g.gender_name,
		s.url,
		CASE
		WHEN c.content_type = 1 
		THEN 'ANIME'
		ELSE 'SERIE'
		END AS type
	FROM content_type c
		INNER JOIN gender AS g ON g.gender_id = c.gender_id
		INNER JOIN storage AS s ON s.storage_id = c.cover_id
	WHERE c.content_type = $1
	GROUP BY 
	    c.content_id, 
	    c.content_title, 
	    c.content_year,
	    g.gender_name,
	    s.url,
	    type`, id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&content.ContentId,
			&content.Title,
			&content.Year,
			&content.Gender,
			&content.UrlCover,
			&content.Type)

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		obj = append(obj, content)
	}

	if len(obj) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(obj)
}

func GetFullContent(c *fiber.Ctx) error {

	panic("sdsd")

}

func PostContent(c *fiber.Ctx) error {
	var (
		content                            entities.Content
		conn                               = db.GetDB()
		err                                error
		existingId                         int
		tx                                 *sql.Tx
		contentId, typeId, coverId, videId int
	)

	if err = c.BodyParser(&content); err != nil {
		_ = helpers.InsertLogsError(conn, "content", "Error al leer los registros")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	qContent := `SELECT COUNT(*) FROM content_type WHERE content_title  = $1`
	err = conn.QueryRow(qContent, strings.ToUpper(content.Title)).Scan(&existingId)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error ejecutando la consulta "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error ejecutando la consulta"})
	}

	if existingId > 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "El registro ya existe"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	switch content.Type {
	case 1:
		typeId = 1
	case 2:
		typeId = 2
	}

	coverId, err = helpers.StorageManager(dto.StorageItemDTO{Option: "INSERT", FileName: uuid.New().String(), Url: content.UrlCover, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error insertando el cover "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando el cover"})
	}

	// INSERTAR EL CONTENIDO
	qInsertContent := `
		INSERT INTO content_type (content_title, content_type, content_year, gender_id, cover_id)
		VALUES ($1, $2, $3, $4, $5)`

	err = tx.QueryRow(qInsertContent,
		strings.ToUpper(content.Title),
		typeId,
		content.Year,
		content.GenderId,
		coverId).Scan(&contentId)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "No se pudo crear el registro "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "No se pudo crear el registro"})
	}

	// INSERTAR LOS EPISODIOS
	for _, episode := range content.Episodes {

		videId, err = helpers.StorageManager(dto.StorageItemDTO{Option: "INSERT", FileName: uuid.New().String(), Url: episode.UrlVideo, TX: tx})
		if err != nil {
			_ = helpers.InsertLogsError(conn, "storage", "error insertando el video "+err.Error())
			return c.Status(500).JSON(fiber.Map{"messaje": "error insertando el video"})
		}

		qInsertEpisodes := `
		INSERT INTO episode (episode_name, episode_number, video_id, season_id, content_id)
		VALUES ($1, $2, $3, $4, $5)`

		_, err = tx.Exec(qInsertEpisodes,
			strings.ToUpper(episode.Name),
			episode.Number,
			videId,
			episode.SeasonId,
			contentId)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "episode", "No se pudo crear el registro "+err.Error())
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "No se pudo crear el registro"})
		}
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "INSERT", "content", contentId, "registro creado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "registro creado correctamente"})
}

func PutContent(c *fiber.Ctx) error {
	var (
		content                            entities.Content
		conn                               = db.GetDB()
		err                                error
		existingId                         int
		tx                                 *sql.Tx
		contentId, typeId, coverId, videId int
	)

	if err = c.BodyParser(&content); err != nil {
		_ = helpers.InsertLogsError(conn, "content", "Error al leer los registros")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	qContent := `SELECT COUNT(*) FROM content_type WHERE content_id = $1`
	err = conn.QueryRow(qContent, content.ContentId).Scan(&existingId)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error ejecutando la consulta "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error ejecutando la consulta"})
	}

	if existingId == 0 {
		return c.Status(404).JSON(fiber.Map{"message": "no existe el registro"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	switch content.Type {
	case 1:
		typeId = 1
	case 2:
		typeId = 2
	}

	coverId, err = helpers.StorageManager(dto.StorageItemDTO{Option: "UPDATE", FileName: uuid.New().String(), Url: content.UrlCover, TX: tx})
	if err != nil {
		_ = helpers.InsertLogsError(conn, "storage", "error actualizando el cover "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error actualizando el cover"})
	}

	// ACTUALIZAR EL CONTENIDO
	qInsertContent := `
		UPDATE content_type 
		SET  content_title 	= $1, 
		     content_type 	= $2, 
		     content_year 	= $3, 
		     gender_id 		= $4, 
		     cover_id 		= $5
		WHERE content_id 	= $6`

	_, err = tx.Exec(qInsertContent,
		strings.ToUpper(content.Title),
		typeId,
		content.Year,
		content.GenderId,
		coverId,
		content.ContentId)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "No se pudo actualizar el registro "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "No se pudo actualizar el registro"})
	}

	// ACTUALIZAR LOS EPISODIOS
	for _, episode := range content.Episodes {

		videId, err = helpers.StorageManager(dto.StorageItemDTO{Option: "UPDATE", FileName: uuid.New().String(), Url: episode.UrlVideo, TX: tx})
		if err != nil {
			_ = helpers.InsertLogsError(conn, "storage", "error actualizando el video "+err.Error())
			return c.Status(500).JSON(fiber.Map{"messaje": "error actualizando el video"})
		}

		qInsertEpisodes := `
		UPDATE episode 
		SET    episode_name 	= $1, 
		       episode_number 	= $2, 
		       video_id 		= $3, 
		       season_id 		= $4, 
		       content_id 		= $5
		WHERE  episode_id 		= $6`

		_, err = tx.Exec(qInsertEpisodes,
			strings.ToUpper(episode.Name),
			episode.Number,
			videId,
			episode.SeasonId,
			contentId,
			episode.EpisodeId)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "episode", "No se pudo actualiza el registro "+err.Error())
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "No se pudo actualiza el registro"})
		}
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "UPDATE", "content", contentId, "registro modificado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "registro modificado correctamente"})
}

func DeleteContent(c *fiber.Ctx) error {

	var (
		coverID int
		conn    = db.GetDB()
		err     error
		tx      *sql.Tx
		rows    *sql.Rows
		videoID []int
	)

	id, _ := strconv.Atoi(c.Params("id"))

	qContent := `
	SELECT cover_id FROM content_type WHERE content_id = $1`
	err = conn.QueryRow(qContent, id).Scan(&coverID)
	if err != nil {

		if errors.Is(err, sql.ErrNoRows) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "registro no existe"})
		}

		_ = helpers.InsertLogsError(conn, "content", "error ejecutando la consulta "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error ejecutando la consulta"})

	}

	qEpisodes := `
	SELECT 
	    e.video_id
	FROM 
	    episode AS e
	INNER JOIN content_type AS ct ON ct.content_id = e.content_id
	WHERE ct.content_id = $1
	GROUP BY e.video_id`

	rows, err = conn.Query(qEpisodes, id)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "movie", "Error ejecutando la consulta: "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error ejecutando la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		var obj int
		err = rows.Scan(
			&obj)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "movie", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		videoID = append(videoID, obj)
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error iniciando transacción "+err.Error())
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
	for _, vId := range videoID {
		_, err = helpers.StorageManager(dto.StorageItemDTO{Option: "DELETE", StorageId: vId, TX: tx})
		if err != nil {
			_ = helpers.InsertLogsError(conn, "storage", "error eliminando el video "+err.Error())
			return c.Status(500).JSON(fiber.Map{"messaje": "error eliminando el video"})
		}
	}

	dContent := `DELETE FROM content_type WHERE content_id = $1`
	_, err = tx.Exec(dContent, id)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error eliminando el registro "+err.Error())
		return c.Status(500).JSON(fiber.Map{"message": "error eliminando el registro"})
	}

	err = helpers.InsertLogs(tx, "DELETE", "content", id, "registro eliminado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "content", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "registro eliminado correctamente"})

}
