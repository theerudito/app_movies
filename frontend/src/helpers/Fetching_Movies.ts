import axios from "axios";
import { Movies, MoviesDTO } from "../models/Movies";
import { url_base } from "./Initial";
import { AddGuiones } from "./Añadir_Guiones";

export const GET_Movies = async () => {
  try {
    const response = await axios.get<MoviesDTO[]>(`${url_base}/movie`);

    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const GET_Find_Movies = async (value: string) => {
  try {
    const response = await axios.get<MoviesDTO[]>(
      `${url_base}/movie/find/${AddGuiones(value)}`
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

export const POST_Movie = async (obj: Movies) => {
  try {
    const response = await axios.post(`${url_base}/movie`, obj);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const PUT_Movie = async (obj: Movies) => {
  try {
    const response = await axios.put(`${url_base}/movie`, obj);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};

export const DELETE_Movie = async (id: number) => {
  try {
    const response = await axios.delete(`${url_base}/movie/${id}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let message = "Error desconocido";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || message;
    }
    return { success: false, error: message };
  }
};
