import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    navigate("/");
    if (e && e.currentTarget) {
        e.currentTarget.blur();
    }
  };

  const handleTitleClick = (e) => {
    navigate("/");
    if (e && e.currentTarget) {
        e.currentTarget.blur();
    }
  };

  const handleKeyDown = (e, handler) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler(e);
    }
  };

  return (
    <header 
      className="header" 
      role="banner"
      aria-label="Cabeçalho principal"
    >
      <div className="header-content">
        <div 
          className="logo-container"
          role="button"
          tabIndex="0"
          onClick={handleLogoClick}
          onKeyDown={(e) => handleKeyDown(e, handleLogoClick)}
          aria-label="Ir para página inicial"
        >
          <img 
            src="/netodigital.png"
              alt="Ilustração de uma avó e uma criança representando inclusão digital entre gerações, ao lado do texto Neto Digital"
              className="logo"
              
          />

        </div>

        <h1 
          className="title" 
          tabIndex="0"
          role="button"
          onClick={handleTitleClick}
          onKeyDown={(e) => handleKeyDown(e, handleTitleClick)}
          aria-label="Ir para página inicial"
        >
          Neto digital
        </h1>
      </div>
    </header>
  );
}