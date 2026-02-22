package entities

type Content struct {
	ContentId int       `json:"content_id"`
	Title     string    `json:"title"`
	Type      int       `json:"type"`
	UrlCover  string    `json:"url_cover"`
	Year      int       `json:"year"`
	GenderId  int       `json:"gender_id"`
	Episodes  []Episode `json:"episodes"`
}
