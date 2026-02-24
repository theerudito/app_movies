import { useEffect } from "react";
import { useContent } from "../store/useContent";
import cover from "../assets/logo.webp";
import { useAuth } from "../store/useAuth";

import { Component_Search } from "./Component_Search";
import { useNavigate } from "react-router-dom";

export const Component_Serie_Anime = () => {
  const { getContents, list_contents, type_content, changeType } = useContent(
    (state) => state,
  );
  const { isLogin } = useAuth((state) => state);
  const nav = useNavigate();

  const OpenContent = (id: number) => {
    if (id > 0) {
      nav(`/content/${id}`);
    }
    return;
  };

  useEffect(() => {
    changeType(type_content);
    getContents();
  }, [getContents, changeType, type_content]);

  return (
    <div className="app-container">
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
                    <i
                      className="bi bi-play-circle"
                      onClick={() => OpenContent(item.content_id)}
                    ></i>
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
  );
};
