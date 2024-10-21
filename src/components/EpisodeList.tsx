import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface Episode {
  id: number;
  name: string;
  url: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  onSelectEpisode: (episodeUrl: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  onSelectEpisode,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  const handleEpisodeClick = (id: number, url: string) => {
    if (selectedEpisode === id) {
      setSelectedEpisode(null);
      onSelectEpisode(episodes[0].url);
    } else {
      setSelectedEpisode(id);
      onSelectEpisode(url);
    }
  };

  return (
    <div>
      <div className="md:hidden bg-gray-200 text-white flex justify-between items-center p-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block md:w-64 bg-gray-700 p-4 h-screen overflow-y-auto`}
      >
        <h1 className="text-lg text-center font-semibold text-white">Episodes</h1>
        <ul>
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className={`cursor-pointer p-2 mb-2 rounded-xl ${
                selectedEpisode === episode.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 bg-gray-400"
              }`}
              onClick={() => handleEpisodeClick(episode.id, episode.url)}
            >
              {episode.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpisodeList;
