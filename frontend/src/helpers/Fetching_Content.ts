import axios from "axios";
import {
  Content,
  ContentDTO,
  ContentFullDTO,
  SeasonEpisodeDTO,
} from "../models/Contents";
import { url_base } from "./Initial";
import { AddGuiones } from "./Añadir_Guiones";

export const GET_Contents = async (type: number) => {
  try {
    const response = await axios.get<ContentDTO[]>(
      `${url_base}/content/by/${type}`,
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const GET_Content = async (id: number) => {
  try {
    const response = await axios.get<ContentFullDTO>(
      `${url_base}/content/${id}`,
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const GET_Content_Season = async (
  contendId: number,
  seasonId: number,
) => {
  try {
    const response = await axios.get<SeasonEpisodeDTO>(
      `${url_base}/content/season/${contendId}/${seasonId}`,
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const GET_Find_Content = async (type: number, value: string) => {
  try {
    const response = await axios.get<ContentDTO[]>(
      `${url_base}/content/${type}/find/${AddGuiones(value)}/${type}`,
    );
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const POST_Content = async (obj: Content) => {
  try {
    const response = await axios.post(`${url_base}/content`, obj);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const PUT_Content = async (obj: Content) => {
  try {
    const response = await axios.put(`${url_base}/content`, obj);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const Delete_Content = async (id: number) => {
  try {
    const response = await axios.delete(`${url_base}/content/${id}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};
