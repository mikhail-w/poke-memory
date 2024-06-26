import { useState } from 'react';
import './App.css';

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
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
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

  console.log(cards, turns);

  return (
    <>
      <h1>Poke-Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
    </>
  );
}

export default App;
