import "./GamesList.css";

export default function GamesList() {
  const games = [
    { id: 1, name: "Jogo da Memória", color: "#FF6B6B" },
    { id: 2, name: "Quebra-Cabeça", color: "#4ECDC4" },
    { id: 3, name: "Matemática Divertida", color: "#FFD166" },
    { id: 4, name: "Labirinto", color: "#06D6A0" },
    { id: 5, name: "Quiz Conhecimentos", color: "#118AB2" },
    { id: 6, name: "Aventura Espacial", color: "#9D4EDD" },
    { id: 7, name: "Raciocínio Lógico", color: "#F15BB5" },
    { id: 8, name: "Palavras Cruzadas", color: "#00BBF9" },
  ];

  const handleGameClick = (gameName) => {
    console.log(`Jogo clicado: ${gameName}`);
    alert(`Em desenvolvimento: ${gameName}`);
  };

  return (
    <div className="games-page">
      <div className="games-header">
        <h1 className="games-title">JOGOS</h1>
        <p className="games-subtitle">Escolha um jogo para começar</p>
      </div>
      
      <div className="games-grid">
        {games.map((game) => ( // ← MUDEI AQUI: use 'games' não 'filteredGames'
          <div 
            key={game.id}
            className="game-card"
            onClick={() => handleGameClick(game.name)}
            style={{ '--card-color': game.color }}
            role="button"
            tabIndex="0"
            aria-label={`Jogo ${game.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleGameClick(game.name);
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