import { Modal_Movie } from "../modals/Modal_Movie";
import { useContent } from "../store/useContent";
import { useModal } from "../store/useModal";
import "../styles/Styles_Header.css";
import { Link } from "react-router-dom";
import { Modal_Content } from "../modals/Modal_Content";
import { Modal_Login } from "../modals/Modal_Login";
import { Modal_Season } from "../modals/Modal_Season";
import { Modal_Gender } from "../modals/Modal_Gender";
import { useAuth } from "../store/useAuth";
import { usePlayer } from "../store/usePlayer";

export const Component_Header = () => {
  const { changeType, openContent_Type } = useContent((state) => state);
  const { isLogin } = useAuth((state) => state);
  const { OpenModal } = useModal((state) => state);

  return (
    <>
      <div className="container-header-header">
        <nav className="container-header-nav-links">
          <Link to="/">Inicio</Link>
          <Link
            to="/peliculas"
            onClick={() => usePlayer.setState({ playing: false })}
          >
            Películas
          </Link>
          <Link
            to="/series"
            onClick={() => {
              changeType(2);
              openContent_Type(false, 0);
              usePlayer.setState({ playing: false });
            }}
          >
            Series
          </Link>
          <Link
            to="/animes"
            onClick={() => {
              changeType(1);
              openContent_Type(false, 0);
              usePlayer.setState({ playing: false });
            }}
          >
            Anime
          </Link>
        </nav>

        <div className="container-header-buttons" style={{ color: "white" }}>
          <div onClick={() => OpenModal("movie")}>
            <i className="bi bi-camera-reels"></i>
          </div>

          <div onClick={() => OpenModal("content")}>
            <i className="bi bi-film"></i>
          </div>

          {isLogin === false ? (
            <div onClick={() => OpenModal("login")}>
              <i className="bi bi-person-fill"></i>
            </div>
          ) : (
            <div>
              <i className="bi bi-person-fill-check"></i>
            </div>
          )}
        </div>
      </div>

      <Modal_Content />
      <Modal_Movie />
      <Modal_Login />
      <Modal_Season />
      <Modal_Gender />
    </>
  );
};
