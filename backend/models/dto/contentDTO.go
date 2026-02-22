package dto

type ContentDTO struct {
	ContentId int    `json:"content_id"`
	Title     string `json:"title"`
	Type      string `json:"type"`
	StorageId int    `json:"storage_id"`
	UrlCover  string `json:"url_cover"`
	Year      int    `json:"year"`
	GenderId  int    `json:"gender_id"`
	Gender    string `json:"gender"`
}

type ContentFullDTO struct {
	SeasonId int                `json:"season_id"`
	Content  ContentDTO         `json:"content"`
	Season   []ContentSeasonDTO `json:"seasons"`
}

type ContentSeasonDTO struct {
	SeasonId      int                `json:"season_id"`
	SeasonName    string             `json:"season_name"`
	SeasonEpisode []SeasonEpisodeDTO `json:"episodes"`
}

type SeasonEpisodeDTO struct {
	EpisodeId int    `json:"episode_id"`
	Number    int    `json:"number"`
	Name      string `json:"name"`
	StorageId int    `json:"storage_id"`
	UrlVideo  string `json:"url_video"`
}
