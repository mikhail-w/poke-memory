import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle cards
  const shuffleCards = async () => {
    const pokemonImages = getRandomPokemon();

    // Duplicate the cards
    const shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => {
        let ans = { ...addId(card, idx) };
        return ans;
      });

    setCards(shuffledCards);
    setTurns(0);

    // console.log('SHUFFLED CARDS: ', shuffledCards);
  };

  // Add Id and matched key/value pairs to card object
  const addId = (card, idx) => {
    return { ...card, id: idx, matched: false };
  };

  // Handle a choice
  const handleChoice = card => {
    // console.log(card);

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log(`They match!`);
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log(`They DO NOT match: c1: ${choiceOne.src} c2: ${choiceTwo}`);
        // resetTurn();
        // console.log(`They DO NOT match`);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);
  const resetTurn = () => {
    console.log('=== RESET ===');
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  };

  function getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomPokemon = () => {
    const res = [];

    for (let i = 0; i < 6; i++) {
      let id = getRandomId(1015);
      let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      // let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
      res.push({ src: url });
    }
    return res;
  };

  // console.log(cards, turns);
  // console.log('Choice One: ', choiceOne);
  // console.log('Choice Two: ', choiceTwo);

  return (
    <>
      <h1>Poke-Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div>Turns: {turns}</div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </>
  );
}

export default App;
