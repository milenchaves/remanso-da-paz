import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // IMPORTANTE: Novo hook
import { Send, CheckCircle, XCircle, RefreshCw, ChevronRight } from 'lucide-react';
import './TypingGame.css';
import { GAME_LEVELS } from './TypingLevels';

export default function TypingGame() {
  // Hook para manipular a URL (?level=easy)
  const [searchParams, setSearchParams] = useSearchParams();
  
  // O nível atual é derivado da URL
  const levelId = searchParams.get('level');
  const selectedLevel = GAME_LEVELS.find(l => l.id === levelId);

  const [shuffledPhrases, setShuffledPhrases] = useState([]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState("playing");
  
  const inputRef = useRef(null);

  // === FUNÇÃO DE EMBARALHAR ===
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // === EFEITO: QUANDO O NÍVEL MUDA (OU A PÁGINA CARREGA) ===
  useEffect(() => {
    if (selectedLevel) {
      // Se temos um nível selecionado na URL, preparamos o jogo
      const mixed = shuffleArray(selectedLevel.phrases);
      setShuffledPhrases(mixed);
      setPhraseIndex(0);
      setInputText("");
      setStatus("playing");
    } else {
      // Se não tem nível (estamos no menu), limpamos tudo
      setShuffledPhrases([]);
    }
  }, [selectedLevel]); // Roda sempre que o selectedLevel mudar

  // Foca no input sempre que a frase mudar
  useEffect(() => {
    if (selectedLevel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phraseIndex, selectedLevel]);

  // === SELEÇÃO DE NÍVEL ===
  const handleSelectLevel = (level) => {
    // Ao invés de mudar estado, mudamos a URL.
    // Isso cria um histórico para o botão voltar funcionar.
    setSearchParams({ level: level.id });
  };

  // === LÓGICA DO JOGO ===
  const handleCheck = () => {
    if (!selectedLevel || shuffledPhrases.length === 0) return;

    const currentPhrase = shuffledPhrases[phraseIndex];
    const cleanInput = inputText.trim().toLowerCase();
    const cleanTarget = currentPhrase.text.trim().toLowerCase();

    if (cleanInput === cleanTarget) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const nextPhrase = () => {
    if (phraseIndex < shuffledPhrases.length - 1) {
      setPhraseIndex(prev => prev + 1);
      setInputText("");
      setStatus("playing");
    } else {
      alert(`Parabéns! Você completou todas as frases do ${selectedLevel.title}!`);
      // Volta para o menu limpando a URL
      setSearchParams({});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (status === 'success') {
        nextPhrase();
      } else {
        handleCheck();
      }
    }
  };

  // === TELA 1: MENU DE NÍVEIS (Se não tiver nível na URL) ===
  if (!selectedLevel) {
    return (
      <div className="typing-container">
        <div className="typing-header">
          <h1>Praticando Digitação</h1>
          <p>Escolha um nível para começar:</p>
        </div>

        <div className="levels-grid">
          {GAME_LEVELS.map((level) => (
            <button 
              key={level.id} 
              className="level-card"
              onClick={() => handleSelectLevel(level)}
            >
              <div className="level-info">
                <h3>{level.title}</h3>
                <span>{level.description}</span>
              </div>
              <ChevronRight size={24} color="#3b82f6" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // === TELA 2: O JOGO ===
  // Garante que não quebre se o array estiver vazio por um milissegundo
  if (shuffledPhrases.length === 0) return null;

  const currentPhraseData = shuffledPhrases[phraseIndex];
  const progress = `${phraseIndex + 1} / ${shuffledPhrases.length}`;

  return (
    <div className="typing-container">
      
      <div className="typing-header">
        <h1>{selectedLevel.title}</h1>
        <p className="level-progress">Frase {progress}</p>
      </div>

      <div className="message-area">
        <div className="received-bubble">
          <span className="bubble-label">Copie isto:</span>
          <p className="target-text">{currentPhraseData.text}</p>
        </div>
      </div>

      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (status === 'error') setStatus('playing');
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite aqui..."
          className={`typing-input ${status}`}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        
        <button 
          className={`send-btn ${status}`}
          onClick={status === 'success' ? nextPhrase : handleCheck}
        >
          {status === 'success' ? <RefreshCw size={24} /> : <Send size={24} />}
        </button>
      </div>

      <div className="feedback-area">
        {status === 'error' && (
          <div className="feedback error">
            <XCircle size={20} />
            <span>Ops! Tente conferir as letras.</span>
          </div>
        )}
        {status === 'success' && (
          <div className="feedback success">
            <CheckCircle size={20} />
            <span>Perfeito! Toque no botão para continuar.</span>
          </div>
        )}
        {status === 'playing' && (
          <div className="hint-text">
            Dica: {currentPhraseData.hint}
          </div>
        )}
      </div>
    </div>
  );
}