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

func GetGender(c *fiber.Ctx) error {

	var (
		dto    []entities.Gender
		gender entities.Gender
		conn   = db.GetDB()
		rows   *sql.Rows
		err    error
	)

	rows, err = conn.Query(`
		SELECT g.gender_id, g.gender_name
		FROM gender AS g`)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al consultar los registros"})
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&gender.GenderId, &gender.GenderName)
		if err != nil {
			_ = helpers.InsertLogsError(conn, "gender", "Error al leer los registros")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al leer los registros"})
		}
		dto = append(dto, gender)
	}

	if len(dto) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontraron registros"})
	}

	return c.JSON(dto)

}

func GetGenderId(c *fiber.Ctx) error {

	var (
		gender entities.Gender
		id     = c.Params("id")
		conn   = db.GetDB()
		row    *sql.Row
		err    error
	)

	row = conn.QueryRow(`
		SELECT g.gender_id, g.gender_name
		FROM gender AS g
		WHERE g.gender_id = $1`, id)

	err = row.Scan(&gender.GenderId, &gender.GenderName)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontró el registro"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al consultar el registro"})
	}

	return c.JSON(gender)

}

func PostGender(c *fiber.Ctx) error {

	var (
		gender   entities.Gender
		conn     = db.GetDB()
		err      error
		row      *sql.Row
		tx       *sql.Tx
		genderId int
	)

	if err = c.BodyParser(&gender); err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "Error al leer los registros")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	row = conn.QueryRow("SELECT gender_id FROM gender WHERE gender_name = $1", strings.ToUpper(gender.GenderName))

	if err = row.Scan(&genderId); err != nil && !errors.Is(err, sql.ErrNoRows) {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al verificar el registro"})
	}
	if genderId != 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "El registro ya existe"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	err = tx.QueryRow("INSERT INTO gender (gender_name) VALUES ($1) RETURNING gender_id", strings.ToUpper(gender.GenderName)).Scan(&genderId)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "No se pudo crear el registro "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "No se pudo crear el registro"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "INSERT", "gender", genderId, "registro creado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "registro creado correctamente"})

}

func PutGender(c *fiber.Ctx) error {

	var (
		gender     entities.Gender
		conn       = db.GetDB()
		err        error
		row        *sql.Row
		existingId int
		tx         *sql.Tx
	)

	if err = c.BodyParser(&gender); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	row = conn.QueryRow("SELECT gender_id FROM gender WHERE gender_id = $1", gender.GenderId)

	if err = row.Scan(&existingId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No se encontró el registro"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al verificar el registro"})
	}

	tx, err = conn.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "error iniciando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error iniciando transacción"})
	}

	defer tx.Rollback()

	_, err = conn.Exec("UPDATE gender SET gender_name = $1 WHERE gender_id = $2", strings.ToUpper(gender.GenderName), gender.GenderId)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "No se pudo actualizar el registro "+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "No se pudo actualizar el registro"})
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "error confirmando transacción "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error confirmando transacción"})
	}

	err = helpers.InsertLogs(conn, "UPDATE", "gender", gender.GenderId, "registro actualizado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(conn, "gender", "error insertando la auditoria "+err.Error())
		return c.Status(500).JSON(fiber.Map{"messaje": "error insertando la auditoria"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "registro actualizado correctamente"})

}
