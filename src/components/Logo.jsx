import './Logo.css';
import mainLogo from '../img/logo.png';

function Logo() {
  return (
    <div id="spinner">
      <img className="logo" src={mainLogo} alt="Logo" />
    </div>
  );
}

export default Logo;
