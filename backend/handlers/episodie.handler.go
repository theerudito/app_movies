package handlers

import (
	"database/sql"
	"errors"

	"github.com/gofiber/fiber/v2"
	db "github.com/theerudito/peliculas/database"
	"github.com/theerudito/peliculas/models/dto"
)

func GetEpisode(c *fiber.Ctx) error {

	var (
		obj  []dto.EpisodeDTO
		conn = db.GetDB()
		rows *sql.Rows
		err  error
	)

	rows, err = conn.Query(`
		SELECT
			e.episode_id,
			e.episode_name,
			e.episode_number,
			s.season_name,
			v.url
		FROM episode AS e
			INNER JOIN season AS s ON s.season_id = e.season_id
			INNER JOIN storage AS v ON v.storage_id = e.video_id`)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al consultar los registros"})
	}

	defer rows.Close()

	for rows.Next() {
		var episode dto.EpisodeDTO
		err = rows.Scan(
			&episode.EpisodeId,
			&episode.Name,
			&episode.Number,
			&episode.Season,
			&episode.UrlVideo)

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		obj = append(obj, episode)
	}

	if len(obj) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(obj)

}

func GetEpisodeId(c *fiber.Ctx) error {
	var (
		obj  dto.EpisodeDTO
		id   = c.Params("id")
		conn = db.GetDB()
		row  *sql.Row
		err  error
	)

	row = conn.QueryRow(`
	SELECT
		e.episode_id,
		e.episode_name,
		e.episode_number,
		s.season_name,
		v.url
	FROM episode AS e
		INNER JOIN season AS s ON s.season_id = e.season_id
		INNER JOIN storage AS v ON v.storage_id = e.video_id
	WHERE e.episode_id = $1`, id)

	err = row.Scan(
		&obj.EpisodeId,
		&obj.Name,
		&obj.Number,
		&obj.Season,
		&obj.UrlVideo)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontró el registro"})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al consultar el registro"})
	}

	return c.JSON(obj)

}
