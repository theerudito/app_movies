package dto

import "github.com/theerudito/peliculas/models/entities"

type ContentDTO struct {
	ContentId int    `json:"content_id"`
	Title     string `json:"title"`
	Type      string `json:"type"`
	UrlCover  string `json:"url_cover"`
	Year      int    `json:"year"`
	GenderId  int    `json:"gender_id"`
	Gender    string `json:"gender"`
}

type ContentDataDTO struct {
	Content ContentDTO        `json:"content"`
	Seasons []entities.Season `json:"seasons"`
}

type ContentSeason struct {
	ContentId int          `json:"content_id"`
	SeasonId  int          `json:"season_id"`
	Episodes  []EpisodeDTO `json:"episodes"`
}
