import { useNavigate } from "react-router-dom";
import "./GamesList.css";

export default function GamesList() {
  const navigate = useNavigate();
  const games = [
    { id: 1, name: "Jogo da Memória", color: "#FF6B6B", path: "/games/memory-game" },
    { id: 2, name: "Quiz de Conhecimentos", color: "#118AB2" },
    { id: 3, name: "Organize a gaveta", color: "#5bf19fff" },
    { id: 4, name: "Adivinhe o Intruso", color: "#9D4EDD", path: "/games/odd-one-out" },
    { id: 5, name: "Praticando Digitação", color: "#4CC9F0", path: "/games/typing" },
  ];

  const handleGameClick = (game) => {
    console.log(`Jogo clicado:`, game);

    if (game.path) {
      navigate(game.path);
    } else {
      alert(`Em desenvolvimento: ${game.name}`);
    }
  };

  return (
    <div className="games-page">
      <div className="games-header">
        <h1 className="games-title">JOGOS</h1>
        <p className="games-subtitle">Escolha um jogo para começar</p>
      </div>
      
      <div className="games-grid">
        {games.map((game) => ( 
          <div 
            key={game.id}
            className="game-card"
            onClick={() => handleGameClick(game)}
            style={{ '--card-color': game.color }}
            role="button"
            tabIndex="0"
            aria-label={`Jogo ${game.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleGameClick(game);
              }
            }}
          >
            <div className="game-card-content">
              <div 
                className="game-icon"
                style={{ backgroundColor: game.color }}
              >
                <span className="game-number">{game.id}</span>
              </div>
              <h3 className="game-name">{game.name}</h3>
              <div className="game-hint">Clique para jogar</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="games-footer">
        <p>Mais jogos em breve...</p>
      </div>
    </div>
  );
}