import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import axios from 'axios';

const cardImages = [
  { src: '/public/img/helmet-1.png' },
  { src: '/public/img/potion-1.png' },
  { src: '/public/img/ring-1.png' },
  { src: '/public/img/scroll-1.png' },
  { src: '/public/img/shield-1.png' },
  { src: '/public/img/sword-1.png' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards
  const shuffleCards = async () => {
    const choice = getChoice(1025);

    let URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${choice}.png`;

    const pokemonImages = getPokemon();
    console.log('Pokemon Array: ', pokemonImages);

    // const response = await axios.get(URL);
    // let pokemonImages = response.data.results;
    // console.log(response);

    const shuffledCards = [...pokemonImages, ...pokemonImages]
      .sort(() => Math.random() - 0.5)
      // .map(card => ({ ...card, id: Math.floor(Math.random() * 13) }));
      .map(card => ({ ...card }));

    setCards(genRand(shuffledCards));
    setTurns(0);
  };

  const genRand = cards => {
    const arr = [];
    const size = Object.keys(cards).length;
    // console.log('Cards1: ', cards);

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
