package dto

type MovieDTO struct {
	MovieId  int    `json:"movie_id"`
	Title    string `json:"title"`
	Year     int    `json:"year"`
	UrlCover string `json:"url_cover"`
	UrlVideo string `json:"url_video"`
	GenderId int    `json:"gender_id"`
	Gender   string `json:"gender"`
}
