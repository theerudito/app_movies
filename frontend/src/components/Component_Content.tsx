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

          <div className="anime-info text-center lg:text-left">
            <h5 className="text-xl font-semibold">
              {list_content?.content.title}
            </h5>
            <p className="text-sm text-gray-500">
              {list_content?.content.year}
            </p>
            <p className="text-sm text-gray-500">
              {list_content?.content.gender}
            </p>

            <div className="mt-2 w-full max-w-xs">
              <select
                onChange={handleChangeSelect}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="episode-scroll">
          <div className="episode-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {list_content?.seasons[selectedSeasonIndex].episodes.map(
              (item, key) => (
                <div
                  key={key}
                  className="episode rounded-lg overflow-hidden shadow-lg bg-gray-800"
                >
                  <div className="episode-image relative">
                    <img
                      src={list_content?.content.url_cover}
                      alt={item.name}
                      className="w-100 h-50 object-cover"
                    />
                    <div className="play-button absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity">
                      <i className="bi bi-play-circle text-white text-3xl"></i>
                    </div>
                  </div>
                  <p className="episode-title text-center text-sm text-white py-2">
                    {item.name}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
