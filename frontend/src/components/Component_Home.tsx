import { useEffect } from "react";
import { useMovies } from "../store/useMovies";
import { useContent } from "../store/useContent";
import cover from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { Component_Footer } from "./Component_Footer";

export const Component_Home = () => {
  const { list_movies, getMovies } = useMovies((state) => state);
  const { list_contents, getContents } = useContent((state) => state);
  const nav = useNavigate();

  useEffect(() => {
    getMovies();
    getContents();
  }, [getMovies, getContents]);

  const OpenPlayer = (url: string) => {
    if (!url) return;
    nav("/video");
  };

  return (
    <div className="flex flex-col space-y-0">
      <div className="container mx-auto p-6">
        <p className="text-2xl font-bold mb-1">Últimas Películas</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-8">
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
                  onClick={() => OpenPlayer(item.url_video)}
                ></i>
              </div>
              <div className="absolute top-2 left-25">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto p-6">
        <p className="text-3xl font-bold mb-2">Últimas Series</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {list_contents.map((item) => (
            <div key={item.content_id} className="relative group">
              <img
                src={item.url_cover === "" ? cover : item.url_cover}
                alt={item.url_cover || "Cover"}
                className="w-40 h-60 object-cover rounded-lg"
              />
              <div className="absolute top-0 left-0 w-40 h-60 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-lg flex items-center justify-center">
                <i className="bi bi-play-circle text-white text-4xl"></i>
              </div>
              <div className="absolute top-2 left-25">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto p-6">
        <p className="text-3xl font-bold mb-2">Últimas Anime</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {list_contents.map((item) => (
            <div key={item.content_id} className="relative group">
              <img
                src={item.url_cover === "" ? cover : item.url_cover}
                alt={item.url_cover || "Cover"}
                className="w-40 h-60 object-cover rounded-lg"
              />
              <div className="absolute top-0 left-0 w-40 h-60 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-lg flex items-center justify-center">
                <i className="bi bi-play-circle text-white text-4xl"></i>
              </div>
              <div className="absolute top-2 left-25">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

<Component_Footer />;
