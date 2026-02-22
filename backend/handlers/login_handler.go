package handlers

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	db "github.com/theerudito/peliculas/database"
	"github.com/theerudito/peliculas/helpers"
	"github.com/theerudito/peliculas/models/dto"
	"github.com/theerudito/peliculas/models/entities"
)

func PostLogin(c *fiber.Ctx) error {

	var (
		loginRequest    entities.Login
		conn            = db.GetDB()
		err             error
		user            entities.Login
		password, token string
	)

	if err = c.BodyParser(&loginRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cuerpo de solicitud inválido"})
	}

	err = conn.QueryRow(`
		SELECT username, password 
		FROM login 
		WHERE username = $1`,
		strings.ToUpper(loginRequest.UserName)).Scan(&user.UserName, &user.Password)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Usuario o contraseña incorrectos"})
	}

	password, err = helpers.DesencriptarDato(user.Password)

	if password != loginRequest.Password {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Usuario o contraseña incorrectos"})
	}

	token, err = helpers.GenerateToken(user.UserName + user.Password)
	if err != nil {
		_ = helpers.InsertLogsError(conn, "season", "Error al generar token"+err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al generar token"})
	}

	return c.Status(fiber.StatusOK).JSON(dto.LoginDTO{UserName: user.UserName, Token: token})

}
