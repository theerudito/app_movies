import { useEffect, useState } from "react";
import { useContent } from "../store/useContent";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { usePlayer } from "../store/usePlayer";

export const Component_Content = () => {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const { getContentFull, content_full } = useContent((state) => state);
  const { open_player } = usePlayer((state) => state);
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
    const location = useLocation()

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setSelectedSeasonIndex(index);
  };

  useEffect(() => {
      getContentFull(Number(id));
  }, [getContentFull, id]);

  const OpenPlayer = (url: string) => {
    if (!url) return;
    open_player(url, location.pathname);
    nav("/video");
  };

    return (
        <div className="anime-viewer flex justify-center p-6">

            <div className="w-full max-w-7xl p-6">

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

                    <div className="anime-main p-6 flex flex-col items-center">

                        <div className="anime-image mb-4">
                            <img
                                src={content_full?.content.url_cover}
                                alt={content_full?.content.title}
                                className="w-60 h-auto rounded-lg shadow-md"
                            />
                        </div>

                        <div className="anime-info text-center">
                            <h5 className="text">{content_full?.content.title}</h5>

                            <p className="text">{content_full?.content.year}</p>

                            <p className="text">{content_full?.content.gender}</p>

                            <div className="mt-2 w-full max-w-xs">
                                <select
                                    onChange={handleChangeSelect}
                                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                >
                                    {content_full?.seasons.map((season, index) => (
                                        <option key={index} value={season.season_id}>
                                            {season.season_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="w-full flex justify-center">

                        <div className="episode-scroll max-w-6xl w-full">

                            <div className="episode-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                                {content_full?.seasons[selectedSeasonIndex].episodes.map(
                                    (item, key) => (
                                        <div key={key} className="episode rounded-lg">
                                            <div className="episode-image relative group cursor-pointer">
                                                <img
                                                    src={content_full?.content.url_cover}
                                                    alt={item.name}
                                                    className="w-40 h-60 object-cover rounded-lg mx-auto"
                                                />

                                                <div
                                                    className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg p-4"
                                                >
                                                    <i
                                                        onClick={() => OpenPlayer(item.url_video)}
                                                        className="bi bi-play-circle text-white text-6xl cursor-pointer mb-4"
                                                    ></i>
                                                    <span className="text-white text-center text-base">{item.name}</span>
                                                </div>

                                            </div>
                                        </div>
                                    ),
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};
