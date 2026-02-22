package routes

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/theerudito/peliculas/handlers"
)

func SetupRoutes(app *fiber.App) {

	allowedOrigins := map[string]bool{
		os.Getenv("URL_Frontend"): true,
	}

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS, PATCH",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowOriginsFunc: func(origin string) bool {
			return allowedOrigins[origin]
		},
	}))

	api := app.Group("/api")

	v1 := api.Group("/v1")

	// MOVIES
	v1.Get("/movie", handlers.GetMovie)
	v1.Get("/movie/:id", handlers.GetMovieId)
	v1.Get("/movie/find/:value", handlers.GetFindMovie)
	v1.Post("/movie", handlers.PostMovie)
	v1.Put("/movie", handlers.PutMovie)
	v1.Delete("/movie/:id", handlers.DeleteMovie)

	// CONTENT
	v1.Get("/content/by/:type", handlers.GetContent)
	v1.Get("/content/:id", handlers.GetContentId)
	v1.Get("/content/season/:contendId/:seasonId", handlers.GetContentSeasonId)
	v1.Get("/content/:type/find/:value", handlers.GetFindContent)
	v1.Post("/content", handlers.PostContent)
	v1.Put("/content", handlers.PutContent)
	v1.Delete("/content/:id", handlers.DeleteContent)

	// SEASONS
	v1.Get("/season", handlers.GetSeason)
	v1.Get("/season/:id", handlers.GetSeasonId)
	v1.Post("/season", handlers.PostSeason)
	v1.Put("/season", handlers.PutSeason)

	// GENDER
	v1.Get("/gender", handlers.GetGender)
	v1.Get("/gender/:id", handlers.GetGenderId)
	v1.Post("/gender", handlers.PostGender)
	v1.Put("/gender", handlers.PutGender)

	// EPISODES
	v1.Get("/episode", handlers.GetEpisode)
	v1.Get("/episode/:id", handlers.GetEpisodeId)

	// LOGIN
	v1.Post("/login", handlers.PostLogin)

}
