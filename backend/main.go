package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	db "github.com/theerudito/peliculas/database"
	"github.com/theerudito/peliculas/routes"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println("No se pudo cargar el archivo .env")
	}

	app := fiber.New()

	db.InitDB()

	defer db.GetDB().Close()

	routes.SetupRoutes(app)

	_ = app.Listen(fmt.Sprintf(":%s", os.Getenv("PortServer")))

}
