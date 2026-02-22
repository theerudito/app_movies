package entities

type Episode struct {
	EpisodeId int    `json:"episode_id"`
	Number    int    `json:"number"`
	Name      string `json:"name"`
	UrlVideo  string `json:"url_video"`
	SeasonId  int    `json:"season_id"`
	ContentId int    `json:"content_id"`
}
