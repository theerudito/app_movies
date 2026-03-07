import { useEffect } from "react";
import { useMovies } from "../store/useMovies";
import { useContent } from "../store/useContent";
import cover from "../assets/logo.webp";
import {useLocation, useNavigate} from "react-router-dom";
import { usePlayer } from "../store/usePlayer";
import { useAuth } from "../store/useAuth";

export const Component_Home = () => {
  const { list_movies, getMovies, deleteMovies } = useMovies((state) => state);
  const {
    list_anime,
    getContentAnime,
    list_serie,
    getContentSerie,
      getContent,
      removeContent
  } = useContent((state) => state);
  const { open_player } = usePlayer((state) => state);
  const { isLogin } = useAuth((state) => state);
  const nav = useNavigate();
    const location = useLocation()

  useEffect(() => {
    getMovies();
    getContentAnime("home");
    getContentSerie("home");
  }, [getMovies, getContentAnime, getContentSerie]);

  const OpenMovie = (url: string) => {
    if (!url) return;
    open_player(url, location.pathname);
    nav("/video");
  };

    const OpenContent = (id: number) => {
        if (id > 0) {
            nav(`/content/${id}`);
        }
        return;
    };

  return (
    <div className="flex flex-col space-y-0">
      <div className="container py-2">
        <p className="text text-2xl font-bold mb-1">Últimas Películas</p>
        <div className="flex flex-wrap gap-4 w-fit justify-center  p-4 rounded-2xl">
          {list_movies.map((item) => (
              <div key={item.movie_id} className="relative group cursor-pointer">
                  <img
                      src={item.url_cover === "" ? cover : item.url_cover}
                      alt={item.url_cover || "Cover"}
                      className="w-40 h-60 object-cover rounded-lg"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center">
                      <i
                          className="bi bi-play-circle text-white text-5xl cursor-pointer"
                          onClick={() => item.movie_id > 0 && OpenMovie(item.url_video)}
                      ></i>
                  </div>

                  <div className="absolute top-2 right-2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      {item.year}
                    </span>
                  </div>

                  {isLogin && item.movie_id > 0 && (
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition">
                          <i
                              className="bi bi-pencil text-white text-lg cursor-pointer hover:text-purple-400"
                          ></i>

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

      <div className="container py-2">
        <p className="text text-2xl font-bold mb-1">Últimas Series</p>
        <div className="flex flex-wrap gap-4 w-fit justify-center  p-4 rounded-2xl">
          {list_serie.map((item) => (
              <div key={item.content_id} className="relative group cursor-pointer">
                  <img
                      src={item.url_cover === "" ? cover : item.url_cover}
                      alt={item.url_cover || "Cover"}
                      className="w-40 h-60 object-cover rounded-lg"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center">
                      <i
                          className="bi bi-play-circle text-white text-5xl cursor-pointer"
                          onClick={() => OpenContent(item.content_id)}
                      ></i>
                  </div>

                  <div className="absolute top-2 right-2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {item.year}
                </span>
                  </div>

                  {isLogin && item.content_id > 0 && (
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition">
                          <i
                              className="bi bi-pencil text-white text-lg cursor-pointer hover:text-purple-400"
                              onClick={() => getContent(item, "content")}
                          ></i>

                          <i
                              className="bi bi-trash text-white text-lg cursor-pointer hover:text-red-500"
                              onClick={() => removeContent(item.content_id)}
                          ></i>
                      </div>
                  )}
              </div>
          ))}
        </div>
      </div>

      <div className="container py-2">
        <p className="text text-2xl font-bold mb-1">Últimas Anime</p>
        <div className="flex flex-wrap gap-4 w-fit justify-center  p-4 rounded-2xl">
          {list_anime.map((item) => (
              <div key={item.content_id} className="relative group cursor-pointer">
                  <img
                      src={item.url_cover === "" ? cover : item.url_cover}
                      alt={item.url_cover || "Cover"}
                      className="w-40 h-60 object-cover rounded-lg"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center">
                      <i
                          className="bi bi-play-circle text-white text-5xl cursor-pointer"
                          onClick={() => OpenContent(item.content_id)}
                      ></i>
                  </div>

                  <div className="absolute top-2 right-2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      {item.year}
                    </span>
                  </div>

                  {isLogin && item.content_id > 0 && (
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition">
                          <i
                              className="bi bi-pencil text-white text-lg cursor-pointer hover:text-purple-400"
                              onClick={() => getContent(item, "content")}
                          ></i>

                          <i
                              className="bi bi-trash text-white text-lg cursor-pointer hover:text-red-500"
                              onClick={() => removeContent(item.content_id)}
                          ></i>
                      </div>
                  )}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};
