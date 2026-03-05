package dto

type EpisodeDTO struct {
	EpisodeId int    `json:"episode_id"`
	Number    int    `json:"number"`
	Name      string `json:"name"`
	UrlVideo  string `json:"url_video"`
}

type EpisodesDTO struct {
	ContentId int          `json:"content_id"`
	SeasonId  int          `json:"season_id"`
	Season    string       `json:"season"`
	Episodes  []EpisodeDTO `json:"episodes"`
}
