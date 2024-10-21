import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 

interface Episode {
  id: number;
  name: string;
  url: string;
}

interface EpisodeListProps {
  episodes: Episode[]; // Array of episodes to be displayed
  onSelectEpisode: (episodeUrl: string) => void; // Function to handle episode selection
  isMenuOpen: boolean; // State to determine if the menu is open
  setIsMenuOpen: (value: boolean) => void; // Function to toggle the menu visibility
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  onSelectEpisode,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  // State to track the currently selected episode
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  // Function to handle click on an episode
  const handleEpisodeClick = (id: number, url: string) => {
    // Check if the clicked episode is already selected
    if (selectedEpisode === id) {
      // Deselect the episode and load the first episode's characters
      setSelectedEpisode(null);
      onSelectEpisode(episodes[0].url); // Load first episode's characters
    } else {
      // Select the new episode and load its characters
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
          isMenuOpen ? "block" : "hidden" // Toggle visibility based on isMenuOpen state
        } md:block md:w-64 bg-gray-700 p-4 h-screen overflow-y-auto`} // Set styles for the sidebar
      >
        <h1 className="text-lg text-center font-semibold text-white">Episodes</h1>
        <ul>
          {/* Map over episodes to display them in a list */}
          {episodes.map((episode) => (
            <li
              key={episode.id} // Unique key for each episode item
              className={`cursor-pointer p-2 mb-2 rounded-xl ${
                selectedEpisode === episode.id // Highlight selected episode
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 bg-gray-400"
              }`}
              onClick={() => handleEpisodeClick(episode.id, episode.url)} // Call handleEpisodeClick on click
            >
              {episode.name} {/* Display episode name */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpisodeList; 
