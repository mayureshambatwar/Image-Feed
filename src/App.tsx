import React, { useEffect, useState } from 'react';
import EpisodeList from './components/EpisodeList';
import CharacterFeed from './components/CharacterFeed';
import axios from 'axios';

const App: React.FC = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [characterUrls, setCharacterUrls] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const episodeResponse = await axios.get('https://rickandmortyapi.com/api/episode');
      const episodesData = episodeResponse.data.results;
      setEpisodes(episodesData);

      if (episodesData.length > 0) {
        const firstEpisodeUrl = episodesData[0].url;
        const characterResponse = await axios.get(firstEpisodeUrl);
        setCharacterUrls(characterResponse.data.characters);
      }
    };

    loadInitialData();
  }, []);

  const handleSelectEpisode = async (episodeUrl: string) => {
    const response = await axios.get(episodeUrl);
    setCharacterUrls(response.data.characters);
  };

  return (
    <div className="flex gap-2 h-screen">
      <EpisodeList
        episodes={episodes}
        onSelectEpisode={handleSelectEpisode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <CharacterFeed characterUrls={characterUrls} />
    </div>
  );
};

export default App;
