export interface Content {
    content_id: number;
    title: string;
    content_type_id: number;
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
    content_type_id : number,
}


