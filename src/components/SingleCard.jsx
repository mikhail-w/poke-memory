import './SingleCard.css';

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    // console.log('Card Clicked!');

    // prevents user from clicking multiple cards too quickly
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          className="back"
          src="../public/img/ball.png"
          onClick={handleClick}
          alt="card-back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
