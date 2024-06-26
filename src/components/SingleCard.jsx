import './SingleCard.css';

import React from 'react';

function SingleCard({ card }) {
  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card-front" />
        <img src="../public/img/pokemon-card-back.png" alt="card-back" />
      </div>
    </div>
  );
}

export default SingleCard;
