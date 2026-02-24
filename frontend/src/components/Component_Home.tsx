import { useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useMovies } from "../store/useMovies";
import cover from "../assets/logo.webp";
import { useContent } from "../store/useContent";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../store/usePlayer";

export const Component_Home = () => {
  const { list_movies, getMovies, deleteMovies } = useMovies((state) => state);
  const { isLogin } = useAuth((state) => state);
  const { open_player } = usePlayer((state) => state);

  const { getContents, list_contents, type_content, changeType } = useContent(
    (state) => state,
  );

  const nav = useNavigate();

  const OpenPlayer = (url: string) => {
    if (!url) return;
    open_player(url);
    nav("/video");
  };
  useEffect(() => {
    changeType(type_content);
    getContents();
    getMovies();
  }, [getMovies, getContents, changeType, type_content]);

  return (
    <div className="app-container_home">
      <div className="app-container">
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
                        onClick={() => OpenPlayer(item.url_video)}
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
      <div>
        {" "}
        <div className="app-container">
          <div className="main-content">
            <div className="container-content">
              <div className="container-body">
                {list_contents.map((item) => (
                  <div key={item.content_id} className="container-card">
                    <img
                      src={item.url_cover === "" ? cover : item.url_cover}
                      alt={cover}
                      className="card-background-image"
                    />

                    <div className="card-overlay">
                      <p className="card-year">{item.year}</p>
                      <div className="card-play">
                        <i className="bi bi-play-circle"></i>
                      </div>
                      <div className="card-container-button">
                        {isLogin && (
                          <>
                            <i className="bi bi-pencil-square"></i>
                            <i className="bi bi-trash"></i>
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
      </div>
      <div>
        {" "}
        <div className="app-container">
          <div className="main-content">
            <div className="container-content">
              <div className="container-body">
                {list_contents.map((item) => (
                  <div key={item.content_id} className="container-card">
                    <img
                      src={item.url_cover === "" ? cover : item.url_cover}
                      alt={cover}
                      className="card-background-image"
                    />

                    <div className="card-overlay">
                      <p className="card-year">{item.year}</p>
                      <div className="card-play">
                        <i className="bi bi-play-circle"></i>
                      </div>
                      <div className="card-container-button">
                        {isLogin && (
                          <>
                            <i className="bi bi-pencil-square"></i>
                            <i className="bi bi-trash"></i>
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
      </div>
    </div>
  );
};
