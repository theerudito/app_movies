package entities

type Content struct {
	ContentId     int    `json:"content_id"`
	Title         string `json:"title"`
	ContentTypeId int    `json:"content_type_id"`
	UrlCover      string `json:"url_cover"`
	Year          int    `json:"year"`
	GenderId      int    `json:"gender_id"`
}
