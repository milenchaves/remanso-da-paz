import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import './QuizGame.css';
import { QUIZ_LEVELS } from './QuizLevels';

export default function QuizGame() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const levelId = searchParams.get('level');
  const selectedLevel = QUIZ_LEVELS.find(l => l.id === levelId);

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Embaralhar perguntas quando o nível mudar
  useEffect(() => {
    if (selectedLevel) {
      const shuffled = [...selectedLevel.questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
      setQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setGameComplete(false);
    }
  }, [selectedLevel]);

  // Seleção de nível
  const handleSelectLevel = (level) => {
    setSearchParams({ level: level.id });
  };

  // Selecionar resposta
  const handleSelectAnswer = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  // Verificar resposta
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = shuffledQuestions[questionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
  };

  // Próxima pergunta
  const handleNextQuestion = () => {
    if (questionIndex < shuffledQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  // Reiniciar jogo
  const handleRestart = () => {
    const shuffled = [...selectedLevel.questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  };

  // Voltar ao menu
  const handleBackToMenu = () => {
    setSearchParams({});
  };

  // TELA 1: MENU DE NÍVEIS
  if (!selectedLevel) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Quiz de Conhecimentos</h1>
          <p>Teste o que você aprendeu com os tutoriais!</p>
        </div>

        <div className="levels-grid">
          {QUIZ_LEVELS.map((level) => (
            <div
              key={level.id}
              className="level-card"
              onClick={() => handleSelectLevel(level)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectLevel(level);
                }
              }}
            >
              <div className="level-info">
                <h3>{level.title}</h3>
                <span>{level.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TELA 2: JOGO COMPLETO
  if (gameComplete) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage === 100) {
      message = 'Perfeito! Você acertou tudo!';
      emoji = '🎉';
    } else if (percentage >= 70) {
      message = 'Muito bem! Você está aprendendo!';
      emoji = '👏';
    } else if (percentage >= 50) {
      message = 'Bom trabalho! Continue praticando!';
      emoji = '👍';
    } else {
      message = 'Não desista! Revise os tutoriais e tente novamente!';
      emoji = '💪';
    }

    return (
      <div className="quiz-container">
        <div className="quiz-complete">
          <div className="completion-emoji">{emoji}</div>
          <h2>{message}</h2>
          <p className="score-text">
            Você acertou {score} de {shuffledQuestions.length} perguntas
          </p>
          <p className="score-percentage">{percentage}%</p>
          
          <div className="completion-buttons">
            <button className="btn-primary" onClick={handleRestart}>
              <RotateCcw size={20} />
              Jogar Novamente
            </button>
            <button className="btn-secondary" onClick={handleBackToMenu}>
              Escolher Outro Nível
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TELA 3: PERGUNTAS
  if (shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[questionIndex];
  const progress = `${questionIndex + 1} / ${shuffledQuestions.length}`;
  const isCorrect = selectedAnswer === currentQuestion.correct;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{selectedLevel.title}</h1>
        <p className="level-progress">Pergunta {progress}</p>
        <p className="score-display">Pontuação: {score} / {shuffledQuestions.length}</p>
      </div>

      <div className="question-card">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            let optionClass = 'option-btn';
            
            if (showResult) {
              if (index === currentQuestion.correct) {
                optionClass += ' correct';
              } else if (index === selectedAnswer && !isCorrect) {
                optionClass += ' incorrect';
              }
            } else if (selectedAnswer === index) {
              optionClass += ' selected';
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
              >
                {option}
                {showResult && index === currentQuestion.correct && (
                  <CheckCircle size={20} className="icon-correct" />
                )}
                {showResult && index === selectedAnswer && !isCorrect && (
                  <XCircle size={20} className="icon-incorrect" />
                )}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`explanation ${isCorrect ? 'explanation-correct' : 'explanation-incorrect'}`}>
            {isCorrect ? (
              <>
                <CheckCircle size={24} />
                <span>Correto! {currentQuestion.explanation}</span>
              </>
            ) : (
              <>
                <XCircle size={24} />
                <span>Incorreto. {currentQuestion.explanation}</span>
              </>
            )}
          </div>
        )}

        <div className="quiz-actions">
          {!showResult ? (
            <button 
              className="btn-check"
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
            >
              Verificar Resposta
            </button>
          ) : (
            <button 
              className="btn-next"
              onClick={handleNextQuestion}
            >
              {questionIndex < shuffledQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

