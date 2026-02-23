import { useEffect } from "react";
import "../styles/Styles_Serie_Anime_Movies.css";
import { useContent } from "../store/useContent";
import cover from "../assets/logo.webp";
import { useAuth } from "../store/useAuth";
import { Component_Content } from "./Component_Content";
import { Component_Search } from "./Component_Search";

export const Component_Serie_Anime = () => {
  const { getContents, list_contents, openContent } = useContent(
    (state) => state,
  );
  const { isLogin } = useAuth((state) => state);

  useEffect(() => {
    getContents(1);
  }, [getContents]);

  return (
    <div className="app-container">
      {openContent === false ? (
        <div>
          <Component_Search />

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
      ) : (
        <Component_Content />
      )}
    </div>
  );
};
