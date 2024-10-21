import React, { useState, useEffect } from "react";

// Define the type for a Character
interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterFeedProps {
  characterUrls: string[];
}

const CharacterFeed: React.FC<CharacterFeedProps> = ({ characterUrls }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Tracks the current page
  const charactersPerPage = 15; // Number of characters to display per page

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const characterData = await Promise.all(
        characterUrls.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        })
      );
      setCharacters(characterData);
    };
    fetchCharacterDetails();
  }, [characterUrls]);

  // Calculate the characters to display for the current page
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  // Event handlers for pagination buttons
  const handleNext = () => {
    if (currentPage < Math.ceil(characters.length / charactersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-4 text-2xl font-bold">
        Rick and Morty Feed
      </h1>
      <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-4 sm:grid-cols-3">
        {currentCharacters.map((character) => (
          <div key={character.id} className="relative transform translate-all hover:scale-105 duration-300">
            <img
              src={character.image}
              alt={character.name}
              className="w-[200px] h-[200px] mr-7 rounded-lg shadow-md"
            />
            <p className="text-center mt-2  font-medium">{character.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentPage >= Math.ceil(characters.length / charactersPerPage)
          }
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage >= Math.ceil(characters.length / charactersPerPage)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterFeed;
