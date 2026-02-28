import {useContent} from "../store/useContent";
import {Link} from "react-router-dom";
import {
    HomeIcon,
    PlayCircleIcon,
    PlayIcon,
    PowerIcon,
    SparklesIcon,
    Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import {FilmIcon} from "@heroicons/react/24/outline";
import {UserIcon} from "@heroicons/react/24/outline";
import {Modal_Season} from "../modals/Modal_Season";
import {useModal} from "../store/useModal";
import {useAuth} from "../store/useAuth";
import {PlayPauseIcon} from "@heroicons/react/20/solid";
import {Modal_Login} from "../modals/Modal_Login";
import {Modal_Gender} from "../modals/Modal_Gender";
import {Modal_Movie} from "../modals/Modal_Movie";
import {Modal_Anime} from "../modals/Modal_Serie";
import {Modal_Serie} from "../modals/Modal_Anime";
import {Modal_Episode_Anime} from "../modals/Modal_Episode_Anime.tsx";
import {Modal_Episode_Serie} from "../modals/Modal_Episode_Serie.tsx";

export const Component_Header = () => {
    const {changeType, openContent_Type} = useContent((state) => state);
    const {OpenModal} = useModal((state) => state);
    const {isLogin, Logout} = useAuth((state) => state);

    return (
        <>
            <div
                className="flex flex-col h-screen w-fit bg-slate-900 text-white sm:py-4 py-2 sm:px-4 px-2 gap-2  shadow-lg z-20">
                <Link
                    to="/"
                    className="flex items-center justify-center py-2 px-2 sm:py-4 sm:px-6 rounded-lg bg-purple-500 hover:bg-purple-700 transition duration-300"
                >
                    <HomeIcon className="h-6 w-6"/>
                </Link>

                <Link
                    to="/peliculas"
                    className="flex items-center justify-center sm:py-4 py-4 sm:px-2 px-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <FilmIcon className="h-6 w-6"/>
                </Link>

                <Link
                    to="/series"
                    onClick={() => {
                        changeType(2);
                        openContent_Type(false, 0);
                    }}
                    className="flex items-center justify-center sm:py-2 py-4 sm:px-2 px-1 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <SparklesIcon className="h-6 w-6"/>
                </Link>

                <Link
                    to="/animes"
                    onClick={() => {
                        changeType(1);
                        openContent_Type(false, 0);
                    }}
                    className="flex items-center justify-center sm:py-1 py-4 sm:px-2 px-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <Square3Stack3DIcon className="h-6 w-6"/>
                </Link>

                {
                    isLogin && (
                        <div className="flex flex-col items-center py-6 gap-6">

                            <div className="relative group">
                                <PlayIcon className="h-10 w-10 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition" />

                                <div className="absolute left-full top-0 hidden group-hover:block">
                                    <div className="w-48 bg-slate-900 rounded-lg  p-3">
                                        <button
                                            onClick={() => OpenModal("movie")}
                                            className="block w-full text-left text-white hover:bg-gray-700 p-2 rounded"
                                        >
                                            Añadir Película
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <PlayCircleIcon className="h-10 w-10 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition" />

                                <div className="absolute left-full top-0 hidden group-hover:block">
                                    <div className="w-48 bg-slate-900 rounded-lg  p-3">
                                        <button
                                            onClick={() => OpenModal("anime")}
                                            className="block w-full text-left text-white hover:bg-gray-700 p-2 rounded"
                                        >
                                            Añadir Anime
                                        </button>
                                        <button
                                            onClick={() => OpenModal("episode_anime")}
                                            className="block w-full text-left text-white hover:bg-gray-700 p-2 rounded"
                                        >
                                            Añadir Episodios
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <PlayPauseIcon className="h-10 w-10 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition" />

                                <div className="absolute left-full top-0 hidden group-hover:block">
                                    <div className="w-48 bg-slate-900 rounded-lg  p-3">
                                        <button
                                            onClick={() => OpenModal("serie")}
                                            className="block w-full text-left text-white hover:bg-gray-700 p-2 rounded"
                                        >
                                            Añadir Serie
                                        </button>
                                        <button
                                            onClick={() => OpenModal("episode_serie")}
                                            className="block w-full text-left text-white hover:bg-gray-700 p-2 rounded"
                                        >
                                            Añadir Episodios
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }



                <div className="mt-auto mb-4 flex justify-center w-full">
                    {!isLogin ? (
                        <UserIcon
                            onClick={() => OpenModal("login")}
                            className="flex items-center justify-center py-2 px-2 sm:py-4 sm:px-6 bg-purple-500 rounded-lg hover:bg-purple-600 transition duration-300"
                        />
                    ) : (
                        <PowerIcon
                            onClick={() => Logout()}
                            className="flex items-center justify-center py-2 px-2 sm:py-4 sm:px-6 bg-purple-500 rounded-lg hover:bg-purple-600 transition duration-300"
                        />
                    )}
                </div>
            </div>

            <Modal_Season/>
            <Modal_Login/>
            <Modal_Gender/>
            <Modal_Movie/>
            <Modal_Anime/>
            <Modal_Serie/>
            <Modal_Episode_Anime/>
            <Modal_Episode_Serie/>
        </>
    );
};
