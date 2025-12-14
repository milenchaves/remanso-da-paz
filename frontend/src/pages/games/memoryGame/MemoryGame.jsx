import { useState } from "react";
import "./MemoryGame.css";

const appIcons = [
  { id: "phone", name: "Telefone", icon: "📞" },
  { id: "mail", name: "E-mail", icon: "✉️" },
  { id: "camera", name: "Câmera", icon: "📷" },
  { id: "gallery", name: "Galeria", icon: "🖼️" },
  { id: "speaker", name: "Alto-falante", icon: "🔊" },
  { id: "message", name: "Mensagem", icon: "💬" },
  { id: "calendar", name: "Calendário", icon: "📅" },
  { id: "settings", name: "Configurações", icon: "⚙️" },
  { id: "music", name: "Música", icon: "🎵" },
  { id: "video", name: "Vídeo", icon: "🎥" },
  { id: "notes", name: "Notas", icon: "📝" },
  { id: "clock", name: "Relógio", icon: "🕐" },
];

const levels = {
  easy: { pairs: 6, gridCols: 4 }, 
  medium: { pairs: 8, gridCols: 4 },
  hard: { pairs: 12, gridCols: 6 },
};

export default function MemoryGame() {
  const [currentLevel, setCurrentLevel] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeGame = (level) => {
    const levelConfig = levels[level];
    const selectedIcons = appIcons.slice(0, levelConfig.pairs);
    
    const pairs = [...selectedIcons, ...selectedIcons];
    
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    
    const newCards = shuffled.map((icon, index) => ({
      id: index,
      iconId: icon.id,
      icon: icon.icon,
      name: icon.name,
      flipped: false,
      matched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameComplete(false);
    setIsInitialized(true);
  };

  if (!isInitialized) {
    initializeGame(currentLevel);
  }
  
  const handleCardClick = (cardId) => {
    const card = cards[cardId];

    if (
      card.flipped ||
      card.matched ||
      flippedCards.length === 2 ||
      gameComplete
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === cardId ? { ...card, flipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard.iconId === secondCard.iconId) {
        setCards((currentCards) =>
          currentCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
              : card
          )
        );
        setMatchedPairs([...matchedPairs, firstCard.iconId]);
        setFlippedCards([]);

        setTimeout(() => {
          setCards(currentCards => {
            const allMatched = currentCards.every((c) => c.matched);
            if (allMatched) {
              setGameComplete(true);
            }
            return currentCards;
          });
        }, 300);
      } else {
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, flipped: false }
                : card
            ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handlePlayAgain = () => {
    initializeGame(currentLevel);
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    initializeGame(level);
  };

  const levelConfig = levels[currentLevel];
  const levelNames = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  };

  return (
    <div className="memory-game-container">
      <div className="memory-game-header">
        <h1 className="memory-game-title">Jogo da Memória</h1>
        <p className="memory-game-subtitle">Encontre os pares de ícones!</p>
      </div>

      <div className="level-selector">
        <button
          className={`level-btn ${currentLevel === "easy" ? "active" : ""}`}
          onClick={() => handleLevelChange("easy")}
        >
          Fácil
        </button>
        <button
          className={`level-btn ${currentLevel === "medium" ? "active" : ""}`}
          onClick={() => handleLevelChange("medium")}
        >
          Médio
        </button>
        <button
          className={`level-btn ${currentLevel === "hard" ? "active" : ""}`}
          onClick={() => handleLevelChange("hard")}
        >
          Difícil
        </button>
      </div>

      {gameComplete && (
        <div className="completion-message">
          <div className="completion-content">
            <span className="completion-emoji">🎉</span>
            <h2 className="completion-title">Parabéns! Você completou o jogo!</h2>
            <p className="completion-subtitle">
              Nível: {levelNames[currentLevel]}
            </p>
            <button className="play-again-btn" onClick={handlePlayAgain}>
              Jogar Novamente
            </button>
          </div>
        </div>
      )}

      <div
        className="memory-game-board"
        style={{ gridTemplateColumns: `repeat(${levelConfig.gridCols}, 1fr)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${
              card.flipped || card.matched ? "flipped" : ""
            } ${card.matched ? "matched" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front">?</div>
            <div className="card-back">
              <span className="card-icon">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
