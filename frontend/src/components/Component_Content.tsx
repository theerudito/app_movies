import { useEffect, useState } from "react";
import { useContent } from "../store/useContent";
import { useParams } from "react-router-dom";

export const Component_Content = () => {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const { getContent, list_content } = useContent((state) => state);
  const { id } = useParams<{ id: string }>();

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setSelectedSeasonIndex(index);
  };

  useEffect(() => {
    getContent(Number(id));
  }, [getContent, id]);

  return (
    <div className="anime-viewer">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="anime-main flex flex-col items-center lg:items-center">
          <div className="anime-image mb-4">
            <img
              src={list_content?.content.url_cover}
              alt={list_content?.content.title}
              className="w-100 h-auto rounded-lg shadow-md"
            />
          </div>

          <div className=" anime-info text-center lg:text-left ">
            <h5 className="text text-center">{list_content?.content.title}</h5>

            <p className="text text-center">{list_content?.content.year}</p>

            <p className="text text-center">{list_content?.content.gender}</p>

            <div className="mt-2 w-full max-w-xs">
              <select
                onChange={handleChangeSelect}
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              >
                {list_content?.seasons.map((season, index) => (
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
              {list_content?.seasons[selectedSeasonIndex].episodes.map(
                (item, key) => (
                  <div key={key} className="episode rounded-lg ">
                    <div className="episode-image relative">
                      <img
                        src={list_content?.content.url_cover}
                        alt={item.name}
                        className="w-40 h-60 object-cover rounded-lg mx-auto"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition">
                        <i className="bi bi-play-circle text-white text-3xl"></i>
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
  );
};
