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
            src="/logo_remanso.jpeg"
              alt="Logo do Remanso da Paz: Um conjunto de mãos estilizadas nas cores vermelho, 
              laranja e amarelo, todas erguidas com um coração vazado no centro da palma. 
              No topo, uma mão vermelha maior aparece estendida para baixo, simbolizando acolhimento e ajuda. 
              Abaixo das ilustrações, há uma faixa preta com o texto 'Remanso da Paz' em letras grandes em tons de amarelo e laranja, 
              e logo abaixo, em letras brancas menores, a frase 'Casa de acolhimento São João Calábria'."
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
          Remanso da Paz
        </h1>
      </div>
    </header>
  );
}