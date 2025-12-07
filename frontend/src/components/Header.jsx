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
            src="/logoremansoapp.png"
            alt="Logo do aplicativo: Um ícone circular com gradiente de verde-água e azul. 
            No centro, uma mão em tom pêssego segura um smartphone azul escuro. 
            Um ícone triangular de Play em azul escuro está visível na tela do celular"
            className="logo"
            width="60"
            height="60"
            aria-hidden="false"
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
          Simplifica
        </h1>
      </div>
    </header>
  );
}