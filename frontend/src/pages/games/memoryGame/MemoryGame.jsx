import { useState, useEffect } from "react";
import "./MemoryGame.css";
import { 
  Phone, MessageSquare, Camera, Volume2, Music, Mic, Image, 
  Video, Search, Sparkles, Images 
} from 'lucide-react';

useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedThemeIndex]);

const iconMap = {
  phone: Phone, 
  message: MessageSquare, 
  camera: Camera, 
  volume: Volume2,
  music: Music, 
  mic: Mic, 
  image: Image, 
  video: Video, 
  search: Search,
  bot: Sparkles, 
  images: Images
};

const colorMap = {
  blue: { bg: '#DBEAFE', text: '#1E40AF' },
  green: { bg: '#D1FAE5', text: '#065F46' },
  purple: { bg: '#E9D5FF', text: '#6B21A8' },
  orange: { bg: '#FED7AA', text: '#9A3412' },
  red: { bg: '#FEE2E2', text: '#991B1B' }
};

const appIcons = [
  { id: "phone", name: "Telefone", iconKey: "phone", color: "blue" },
  { id: "message", name: "Mensagem", iconKey: "message", color: "green" },
  { id: "camera", name: "Câmera", iconKey: "camera", color: "purple" },
  { id: "volume", name: "Alto-falante", iconKey: "volume", color: "orange" },
  { id: "music", name: "Música", iconKey: "music", color: "red" },
  { id: "mic", name: "Microfone", iconKey: "mic", color: "blue" },
  { id: "image", name: "Imagem", iconKey: "image", color: "green" },
  { id: "video", name: "Vídeo", iconKey: "video", color: "purple" },
  { id: "search", name: "Buscar", iconKey: "search", color: "orange" },
  { id: "bot", name: "Assistente", iconKey: "bot", color: "red" },
  { id: "images", name: "Galeria", iconKey: "images", color: "blue" },
];

const levels = {
  easy: { pairs: 6, gridCols: 4 }, 
  medium: { pairs: 10, gridCols: 5 }, 
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
      iconKey: icon.iconKey,
      name: icon.name,
      color: icon.color,
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

  const handleNextLevel = () => {
    const levelOrder = ["easy", "medium", "hard"];
    const currentIndex = levelOrder.indexOf(currentLevel);
    
    if (currentIndex < levelOrder.length - 1) {
      const nextLevel = levelOrder[currentIndex + 1];
      setCurrentLevel(nextLevel);
      initializeGame(nextLevel);
    } else {
      initializeGame(currentLevel);
    }
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    initializeGame(level);
  };

  const handleCloseModal = () => {
    setGameComplete(false);
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
        <>
          <div className="completion-overlay" onClick={handleCloseModal}></div>
          <div className="completion-message">
            <button className="close-modal-btn" onClick={handleCloseModal}>
              ×
            </button>
            <div className="completion-content">
              <span className="completion-emoji">🎉</span>
              <h2 className="completion-title">Parabéns! Você completou o jogo!</h2>
              <p className="completion-subtitle">
                Nível: {levelNames[currentLevel]}
              </p>
              <div className="completion-buttons">
                <button className="play-again-btn" onClick={handlePlayAgain}>
                  Jogar Novamente
                </button>
                {currentLevel !== "hard" && (
                  <button className="next-level-btn" onClick={handleNextLevel}>
                    Próximo Nível
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
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
              {(() => {
                const Icon = iconMap[card.iconKey] || Phone;
                const colors = colorMap[card.color] || colorMap.blue;
                return (
                  <div 
                    className="card-icon-container" 
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    <Icon className="card-icon" size={32} />
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
