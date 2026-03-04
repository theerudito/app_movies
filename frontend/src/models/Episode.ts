export interface Episode {
    episode_id: number;
    number: number;
    name: string;
    url_video: string;
}

export interface Episodes {
    season_id: number;
    content_id: number;
    episodes: Episode[]
}
