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
    // console.log('Pokemon Array: ', pokemonImages);

    // Duplicate the cards
    let shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card }));
    // // console.log(shuffledCards);

    //Modified Loop
    // const shuffledCards = [...pokemonImages, ...pokemonImages]
    //   .sort(() => Math.random() - 0.5)
    //   .map((card, idx) => {
    //     // console.log(card);
    //     let ans = { ...addId2(card, idx) };
    //     // console.log('Ans: ', ans);
    //     return ans;
    //   });

    shuffledCards = addId(shuffledCards);

    setCards(shuffledCards);
    setTurns(0);

    console.log('SHUFFLED CARDS: ', shuffledCards);
  };

  // const addId2 = (card, idx) => {
  //   return { ...card, id: idx, matched: false };
  // };

  const addId = cards => {
    const arr = [];
    const size = Object.keys(cards).length;

    // Assign id's between 0 - array size to random elements inside the array
    while (arr.length < size) {
      let id = Math.floor(Math.random() * size) + 1;
      if (arr.indexOf(id) === -1) arr.push(id);
    }

    // console.log('Array: ', arr);

    // Add Index and matched state key/value pairs to array
    let newCards = cards.reduce((arr, val, idx) => {
      let newVal = { ...val, id: idx, matched: false };
      arr.push(newVal);
      return arr;
    }, []);

    // console.log('New Cards: ', newCards);
    return newCards;
  };

  // Handle a choice
  const handleChoice = card => {
    // console.log(card);

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        // console.log(`They match: c1: ${choiceOne.src} c2: ${choiceTwo.src}`);
        // resetTurn();
        console.log(`They match!`);
        resetTurn();
      } else {
        // console.log(`They DO NOT match: c1: ${choiceOne.src} c2: ${choiceTwo}`);
        // resetTurn();
        console.log(`They DO NOT match`);
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

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
          ></SingleCard>
        ))}
      </div>
    </>
  );
}

export default App;
