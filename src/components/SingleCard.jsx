import './SingleCard.css';

function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    console.log('Card Clicked!');
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card-front" />
        <img
          onClick={handleClick}
          src="../public/img/pokemon-card-back.png"
          alt="card-back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
