package handlers

import (
	"database/sql"
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
	db "github.com/theerudito/peliculas/database"
	"github.com/theerudito/peliculas/helpers"
	"github.com/theerudito/peliculas/models/entities"
)

func GetSeason(c *fiber.Ctx) error {

	var (
		seasons []entities.Season
		rows    *sql.Rows
		err     error
		conn    = db.GetDB()
	)

	rows, err = conn.Query(`
		SELECT
		s.season_id,
		s.season_name
		FROM season AS s`)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "Error al ejecutar la consulta")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		var season entities.Season
		err = rows.Scan(&season.SeasonId, &season.SeasonName)
		if err != nil {
			_ = helpers.InsertLogsError(conn, "season", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}

		seasons = append(seasons, season)
	}

	if len(seasons) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(seasons)

}

func GetSeasonId(c *fiber.Ctx) error {

	var (
		season entities.Season
		rows   *sql.Rows
		err    error
		conn   = db.GetDB()
		id     = c.Params("id")
		found  = false
	)

	rows, err = conn.Query(`
		SELECT
		s.season_id,
		s.season_name
		FROM season AS s
		WHERE s.season_id = $1`, id)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "Error al ejecutar la consulta")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al ejecutar la consulta"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&season.SeasonId, &season.SeasonName)
		if err != nil {
			_ = helpers.InsertLogsError(conn, "season", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}
		found = true
	}

	if !found {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(season)
}

func PostSeason(c *fiber.Ctx) error {

	var (
		season   entities.Season
		row      *sql.Row
		err      error
		conn     = db.GetDB()
		tx       *sql.Tx
		seasonId int
	)

	if err = c.BodyParser(&season); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	row = conn.QueryRow("SELECT season_id FROM season WHERE season_name = $1", strings.ToUpper(season.SeasonName))
	if err = row.Scan(&seasonId); err != nil && !errors.Is(err, sql.ErrNoRows) {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al verificar el registro"})
	}
	if seasonId != 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "El registro ya existe"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	err = tx.QueryRow("INSERT INTO season (season_name) VALUES ($1) RETURNING season_id", strings.ToUpper(season.SeasonName)).Scan(&seasonId)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "Error al insertar el registro "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al insertar el registro"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "INSERT", "season", seasonId, "registro creado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "registro creado correctamente"})

}

func PutSeason(c *fiber.Ctx) error {

	var (
		season     entities.Season
		row        *sql.Row
		err        error
		conn       = db.GetDB()
		existingId int
		tx         *sql.Tx
	)

	if err = c.BodyParser(&season); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	row = conn.QueryRow("SELECT season_id FROM season WHERE season_name = $1", strings.ToUpper(season.SeasonName))
	if err = row.Scan(&existingId); err != nil && !errors.Is(err, sql.ErrNoRows) {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al verificar la existencia del registro"})
	}

	if existingId != 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "El registro ya existe"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	uMovie := `
	UPDATE season 
	SET season_name = $1
	WHERE season_id = $2`

	_, err = tx.Exec(uMovie,
		strings.ToUpper(season.SeasonName),
		season.SeasonId)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "Error al insertar el registro "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al insertar el registro"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "UPDATE", "season", season.SeasonId, "registro actualizado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "registro actualizado correctamente"})

}
