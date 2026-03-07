package dto

type ContentDTO struct {
	ContentId     int    `json:"content_id"`
	Title         string `json:"title"`
	ContentTypeId int    `json:"content_type_id"`
	Type          string `json:"type"`
	StorageId     int    `json:"storage_id"`
	UrlCover      string `json:"url_cover"`
	Year          int    `json:"year"`
	GenderId      int    `json:"gender_id"`
	Gender        string `json:"gender"`
	IsComplete    bool   `json:"is_complete"`
}

type ContentFullDTO struct {
	Content ContentDTO             `json:"content"`
	Seasons []ContentFullSeasonDTO `json:"seasons"`
}

type ContentFullSeasonDTO struct {
	SeasonId   int                     `json:"season_id"`
	SeasonName string                  `json:"season_name"`
	Episodes   []ContentFullEpisodeDTO `json:"episodes"`
}

type ContentFullEpisodeDTO struct {
	EpisodeId int    `json:"episode_id"`
	Number    int    `json:"number"`
	Name      string `json:"name"`
	UrlVideo  string `json:"url_video"`
}
