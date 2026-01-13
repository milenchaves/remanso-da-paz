import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OddOneOut.css";
import { ODD_ONE_THEMES } from "./oddOneData";
import ThemeLevels from "./ThemeLevels.jsx";
import GameModal from "../../../components/GameModal";

const LEVEL_NAMES = ["Fácil", "Médio", "Difícil", "Especialista"];
const LIVES_START = 5;

export default function OddOneOut() {
  const navigate = useNavigate();
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [modalContent, setModalContent] = useState(null);
  const [resetGridSignal, setResetGridSignal] = useState(0);

  const themeData = ODD_ONE_THEMES[selectedThemeIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedThemeIndex]);

  const handleSuccess = useCallback(() => {
    const next = levelIndex + 1;
    const currentThemeLevels = themeData ? themeData.levels : [];

    if (next < currentThemeLevels.length) {
      setModalContent({ type: "levelSuccess", message: " Acertou!" });
    } else {
      setModalContent({ type: "themeComplete", message: "Tema Concluído!" });
    }
  }, [levelIndex, themeData]);

  const handleError = useCallback(() => {
    setLives((l) => {
      const newLives = l - 1;
      if (newLives <= 0) {
        setModalContent({ type: "gameOver", message: "Você Perdeu"});
      } else {
        setResetGridSignal((p) => p + 1);
      }
      return newLives;
    });
  }, []);

  const startTheme = (index) => {
    setSelectedThemeIndex(index);
    setLevelIndex(0);
    setLives(LIVES_START);
  };

  const selectLevel = (index) => {
    setLevelIndex(index);
    setLives(LIVES_START);
    setModalContent(null);
    setResetGridSignal((p) => p + 1);
  };

  const backToThemeSelection = () => {
    setSelectedThemeIndex(null);
    setLevelIndex(0);
    setModalContent(null);
  };

  const topRowThemes = ODD_ONE_THEMES.slice(0, 2);
  const bottomRowThemes = ODD_ONE_THEMES.slice(2);

  if (selectedThemeIndex === null) {
    return (
      <div className="games-page odd-page theme-selection-page">
        <div className="games-header">
          <h1 className="games-title">Adivinhe o Intruso</h1>
          <p className="games-subtitle">Escolha um tema:</p>
        </div>

        <div className="theme-selector-grid games-grid top-row-grid">
          {topRowThemes.map((theme, index) => (
            <div
              key={index}
              className="theme-card game-card"
              onClick={() => startTheme(index)}
              style={{ "--card-color": theme.color || "#3f51b5" }}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  startTheme(index);
                }
              }}
            >
              <div className="game-card-content">
                <h3 className="game-name theme-card-name">{theme.theme}</h3>
                <div className="game-hint">Clique para iniciar</div>
              </div>
            </div>
          ))}
        </div>

        <div className="theme-selector-grid games-grid bottom-row-grid">
          {bottomRowThemes.map((theme, index) => (
            <div
              key={index + 2}
              className="theme-card game-card"
              onClick={() => startTheme(index + 2)}
              style={{ "--card-color": theme.color || "#3f51b5" }}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  startTheme(index + 2);
                }
              }}
            >
              <div className="game-card-content">
                <h3 className="game-name theme-card-name">{theme.theme}</h3>
                <div className="game-hint">Clique para iniciar</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const theme = ODD_ONE_THEMES[selectedThemeIndex];

  if (!theme || levelIndex >= theme.levels.length) {
    setTimeout(() => backToThemeSelection(), 0);
    return (
      <div className="games-page odd-page">
        <p className="games-subtitle">
          Ocorreu um erro. Redirecionando para seleção de temas...
        </p>
      </div>
    );
  }

  const level = theme.levels[levelIndex];

  const modalMap = {
    levelSuccess: {
      title: modalContent?.message,
      subtitle: `Ir para o próximo nível (${LEVEL_NAMES[levelIndex + 1]})?`,
      buttons: [
        { text: "Cancelar", action: () => setModalContent(null) },
        {
          text: "Próximo Nível",
          action: () => {
            setModalContent(null);
            setLevelIndex((p) => p + 1);
          },
          primary: true,
        },
      ],
    },
    gameOver: {
      title: modalContent?.message,
      subtitle: "Você ficou sem vidas.",
      buttons: [
        {
          text: "Tentar Novamente",
          action: () => {
            setLives(LIVES_START);
            setResetGridSignal((p) => p + 1);
            setModalContent(null);
          },
          primary: true,
        },
        { text: "Mudar Tema", action: backToThemeSelection },
      ],
    },
    themeComplete: {
      title: modalContent?.message,
      subtitle: `Você completou ${theme.theme}!`,
      buttons: [
        {
          text: "Mudar Tema",
          action: backToThemeSelection,
          primary: true,
        },
      ],
    },
  };

  return (
    <div className="games-page odd-page">
      <div className="games-header">
        <h1 className="games-title">Adivinhe o Intruso</h1>

        <div className="theme-change-container">
          <button
            className="level-btn theme-change-btn"
            onClick={backToThemeSelection}
          >
            Mudar Tema
          </button>
        </div>

        <p className="games-subtitle">Tema: {theme.theme}</p>
      </div>

      <div className="level-selector level-tabs">
        {theme.levels.map((_, index) => (
          <button
            key={index}
            className={`level-btn ${levelIndex === index ? "active" : ""}`}
            onClick={() => selectLevel(index)}
          >
            {LEVEL_NAMES[index]}
          </button>
        ))}
      </div>

      <p className="games-subtitle">❤️ {lives} vida(s) restante(s)</p>

      <ThemeLevels
        levelData={level}
        onSuccess={handleSuccess}
        onError={handleError}
        resetSignal={resetGridSignal}
      />

      {modalContent && <GameModal {...modalMap[modalContent.type]} />}
    </div>
  );
}
