import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../store/usePlayer";

export const Component_Player = () => {
    const { url, playing, reset } = usePlayer();
    const nav = useNavigate();

    const handleClose = () => {
        reset((loc) => nav(loc))
    };

    if (!url || !playing) return null;

    return (
        <div className="container-player-body fixed top-0 left-0 right-0 bottom-0 bg-black z-50 flex items-center justify-center">

            <button
                className="absolute top-4 right-4 z-60 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
                onClick={() => handleClose()}
            >
                <i className="bi bi-x-lg text-sm text-white cursor-pointer"></i>
            </button>

            <ReactPlayer
                url={url}
                playing={true}
                controls
                volume={0}
                width="100%"
                height="100%"
            />
        </div>
    );
};