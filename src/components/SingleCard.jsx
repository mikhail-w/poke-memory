import './SingleCard.css';

function SingleCard({ card, handleChoice, flipped }) {
  const handleClick = () => {
    console.log('Card Clicked!');
    handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card-front" />
        {/* <div className="front">
        <img className="front" src={card.src} alt="card-front" />
        <h2>Name</h2>
        </div> */}
        <img
          className="back"
          // src="../public/img/pokemon-card-back.png"
          src="../public/img/ball.png"
          onClick={handleClick}
          alt="card-back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
