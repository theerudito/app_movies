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
    <div className="container-player-body fixed top-0 left-0 right-0 bottom-0 bg-black z-50">
      <button
        className="close-button absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
        onClick={handleClose}
      >
        <i className="bi bi-x-lg text-sm text-white bg-gray-700 hover:bg-gray-800 p-2 rounded-full transition-all duration-200 cursor-pointer"></i>
      </button>

      <ReactPlayer
        url={url}
        playing={true}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};
