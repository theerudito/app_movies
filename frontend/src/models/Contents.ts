export interface Content {
    content_id: number;
    title: string;
    type: number;
    url_cover: string;
    year: number;
    gender_id: number;
}

export interface ContentDTO {
    content_id: number;
    title: string;
    type: string;
    storage_id: string;
    url_cover: string;
    year: number;
    gender_id: number;
    gender: string;
}

export const _content: Content = {
    content_id: 0,
    title: "",
    type: 0,
    url_cover: "",
    year: 0,
    gender_id: 0,
};


