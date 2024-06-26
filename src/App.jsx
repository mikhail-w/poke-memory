import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards
  const shuffleCards = async () => {
    const pokemonImages = getPokemon();
    // console.log('Pokemon Array: ', pokemonImages);

    const shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card }));

    setCards(addId(shuffledCards));
    setTurns(0);
  };

  const addId = cards => {
    const arr = [];
    const size = Object.keys(cards).length;

    while (arr.length < size) {
      let id = Math.floor(Math.random() * size) + 1;
      if (arr.indexOf(id) === -1) arr.push(id);
    }

    // console.log('Array: ', arr);

    let newCards = cards.reduce((arr, val, idx) => {
      let newVal = { ...val, id: idx };
      arr.push(newVal);
      return arr;
    }, []);

    // console.log('New Cards: ', newCards);
    return newCards;
  };

  function getChoice(max) {
    return Math.floor(Math.random() * max);
  }

  const getPokemon = () => {
    const res = [];

    for (let i = 0; i < 6; i++) {
      let id = getChoice(1015);
      let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      res.push({ src: url });
    }
    return res;
  };

  // console.log(cards, turns);

  return (
    <>
      <h1>Poke-Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card}></SingleCard>
        ))}
      </div>
    </>
  );
}

export default App;
