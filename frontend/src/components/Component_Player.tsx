import ReactPlayer from "react-player";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../store/usePlayer";

export const Component_Player = () => {
  const { url, playing, reset } = usePlayer();
  const nav = useNavigate();

  useEffect(() => {
    if (!url) {
      nav("/");
    }
  }, [url, nav]);

  const handleClose = () => {
    reset();
    nav("/");
  };

  if (!url || !playing) {
    return <div>No hay video seleccionado</div>;
  }

  return (
    <div className="container-player-body">
      <button className="close-button" onClick={handleClose}>
        <i className="bi bi-x-lg"></i>
      </button>

      <ReactPlayer
        url={url}
        playing={playing}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};
