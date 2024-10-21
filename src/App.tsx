import React, { useEffect, useState } from 'react';
import EpisodeList from './components/EpisodeList';
import CharacterFeed from './components/CharacterFeed';
import axios from 'axios';

const App: React.FC = () => {
  // State to hold the list of episodes fetched from the API
  const [episodes, setEpisodes] = useState<any[]>([]);
  
  // State to hold the character URLs for the selected episode
  const [characterUrls, setCharacterUrls] = useState<string[]>([]);
  
  // State to control the visibility of the episode menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect hook to load the initial data when the component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      const episodeResponse = await axios.get('https://rickandmortyapi.com/api/episode');
      const episodesData = episodeResponse.data.results; 
      setEpisodes(episodesData); 

      // If there are episodes, fetch the characters from the first episode
      if (episodesData.length > 0) {
        const firstEpisodeUrl = episodesData[0].url; // Get the URL of the first episode
        const characterResponse = await axios.get(firstEpisodeUrl); // Fetch the characters for that episode
        setCharacterUrls(characterResponse.data.characters); // Update the character URLs state
      }
    };

    loadInitialData(); // Call the function to load the data
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle the selection of an episode
  const handleSelectEpisode = async (episodeUrl: string) => {
    const response = await axios.get(episodeUrl); 
    setCharacterUrls(response.data.characters); 
  };

  return (
    <div className="flex gap-2 h-screen">
      <EpisodeList
        episodes={episodes} // List of episodes
        onSelectEpisode={handleSelectEpisode} // Function to handle episode selection
        isMenuOpen={isMenuOpen} // State to control menu visibility
        setIsMenuOpen={setIsMenuOpen} // Function to toggle menu visibility
      />
      <CharacterFeed characterUrls={characterUrls} />
    </div>
  );
};

export default App;
