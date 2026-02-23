import { useEffect } from "react";
import { Component_Player } from "./Component_Player";
import { useMovies } from "../store/useMovies";
import cover from "../assets/logo.webp";
import { usePlayer } from "../store/usePlayer";
import "../styles/Styles_Serie_Anime_Movies.css";
import { useAuth } from "../store/useAuth";
import { Component_Search } from "./Component_Search";

export const Component_Movie = () => {
  const { list_movies, getMovies, deleteMovies } = useMovies((state) => state);
  const { open_player, playing } = usePlayer((state) => state);
  const { isLogin } = useAuth((state) => state);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="app-container">
      {playing === false ? (
        <div>
          <Component_Search />

          <div className="main-content">
            <div className="container-content">
              <div className="container-body">
                {list_movies.map((item) => (
                  <div key={item.movie_id} className="container-card">
                    <img
                      src={item.url_cover === "" ? cover : item.url_cover}
                      alt={cover}
                      className="card-background-image"
                    />

                    <div className="card-overlay">
                      <p className="card-year">{item.year}</p>
                      <div className="card-play">
                        <i
                          className="bi bi-play-circle"
                          onClick={() => open_player(item.url_video)}
                        ></i>
                      </div>

                      <div className="card-container-button">
                        {isLogin && (
                          <>
                            <i className="bi bi-pencil-square"></i>
                            <i
                              className="bi bi-trash"
                              onClick={() => deleteMovies(item.movie_id)}
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="component-player">
          <Component_Player />
        </div>
      )}
    </div>
  );
};
