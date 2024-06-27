import './Logo.css';
import mainLogo from '../img/logo.png';

function Logo() {
  return (
    <div>
      <img className="logo" src={mainLogo} alt="Logo" />
    </div>
  );
}

export default Logo;
