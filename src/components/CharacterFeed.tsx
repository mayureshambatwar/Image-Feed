import React, { useState, useEffect } from "react";

interface Character {
  id: number; // Unique identifier for each character
  name: string; // Name of the character
  image: string; // Image URL of the character
}

interface CharacterFeedProps {
  characterUrls: string[]; // Array of character URLs to fetch data from
}

const CharacterFeed: React.FC<CharacterFeedProps> = ({ characterUrls }) => {
  // State to hold the character data fetched from the API
  const [characters, setCharacters] = useState<Character[]>([]);

  // State to track the current page for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  const charactersPerPage = 15;

  // useEffect hook to fetch character details when characterUrls change
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      // Fetch character details for all URLs provided
      const characterData = await Promise.all(
        characterUrls.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        })
      );
      setCharacters(characterData);
    };
    fetchCharacterDetails(); // Call the function to fetch character details
  }, [characterUrls]); // Dependency array ensures this runs whenever characterUrls change

  const indexOfLastCharacter = currentPage * charactersPerPage; // Last character index for current page
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; // First character index for current page
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  ); // Get characters to display on the current page

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
        Rick and Morty 
      </h1>
      <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-4 sm:grid-cols-3">
        {currentCharacters.map((character) => (
          <div
            key={character.id}
            className="relative transform translate-all hover:scale-105 duration-300"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-[200px] h-[200px] mr-7 rounded-lg shadow-md"
            />
            <p className="text-center mt-2 font-medium">{character.name}</p>
          </div>
        ))}
      </div>
      {/* Pagination buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1} // Disable button if on the first page
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
          } // Disable if on the last page
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
