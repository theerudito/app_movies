package dto

type EpisodeDTO struct {
	ContentId int    `json:"content_id"`
	EpisodeId int    `json:"episode_id"`
	Number    int    `json:"number"`
	Name      string `json:"name"`
	UrlVideo  string `json:"url_video"`
	SeasonId  int    `json:"season_id"`
	Season    string `json:"season"`
}
