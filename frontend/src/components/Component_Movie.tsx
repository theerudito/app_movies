import { useEffect } from "react";
import { useMovies } from "../store/useMovies";
import cover from "../assets/logo.webp";

import { Component_Search } from "./Component_Search";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../store/usePlayer";
import { useAuth } from "../store/useAuth";

export const Component_Movie = () => {
  const { list_movies, getMovies, deleteMovies } = useMovies((state) => state);
  const { isLogin } = useAuth((state) => state);

  const { open_player } = usePlayer((state) => state);
  const nav = useNavigate();

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const OpenMovie = (url: string) => {
    if (!url) return;
    open_player(url);
    nav("/video");
  };

  return (
    <>
      <Component_Search />

      <div className="container py-2">
        <p className="text text-2xl font-bold mb-1">Últimas Películas</p>
        <div className="flex flex-wrap gap-4 w-fit justify-center bg-gray-900 p-4 rounded-2xl">
          {list_movies.map((item) => (
            <div key={item.movie_id} className="relative group">
              <img
                src={item.url_cover === "" ? cover : item.url_cover}
                alt={item.url_cover || "Cover"}
                className="w-40 h-60  object-x rounded-lg"
              />
              <div className="absolute top-0 left-0 w-40 h-60 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-lg flex items-center justify-center">
                <i
                  className="bi bi-play-circle text-white text-4xl"
                  onClick={() => item.movie_id > 0 && OpenMovie(item.url_video)}
                ></i>
              </div>
              <div className="absolute top-2 left-25">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.year}
                </span>
              </div>

              {isLogin === false && item.movie_id > 0 && (
                <div className="absolute bottom-2 left-2 right-2 flex justify-between px-1">
                  <i className="bi bi-pencil text-white text-lg cursor-pointer hover:text-purple-400"></i>
                  <i
                    className="bi bi-trash text-white text-lg cursor-pointer hover:text-red-500"
                    onClick={() => deleteMovies(item.movie_id)}
                  ></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
