import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TutorialDetail.css';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Camera,
  Volume2,
  Music,
  Mic,
  Image,
  Video,
  Search,
  Sparkles,
  Images,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

// Estados possíveis: 'intro', 'step-0', 'step-1', ..., 'conclusion'
const getInitialView = (tutorial) => {
  if (!tutorial) return 'step-0';
  if (tutorial.introduction) return 'intro';
  if (tutorial.steps && tutorial.steps.length > 0) return 'step-0';
  if (tutorial.conclusion) return 'conclusion';
  return 'step-0';
};

export default function TutorialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('intro');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageError, setImageError] = useState(false);
  const synthRef = useRef(null);
  const voiceRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE}/api/tutoriais/${id}`);
        if (res.data && res.data.sucesso) {
          const tutorialData = res.data.dados;
          setTutorial(tutorialData);
          setCurrentView(getInitialView(tutorialData));
        } else {
          setError('Resposta inválida do servidor');
        }
      } catch (err) {
        setError(err.response?.data?.mensagem || err.message || 'Erro ao buscar tutorial');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTutorial();
    }

    // Inicializar síntese de voz e buscar vozes mais naturais
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      // Função para carregar e selecionar a melhor voz
      const loadVoices = () => {
        const voices = synthRef.current.getVoices();

        // Filtrar apenas vozes em português brasileiro
        const ptBRVoices = voices.filter(voice =>
          voice.lang === 'pt-BR' ||
          voice.lang.startsWith('pt-BR') ||
          (voice.lang === 'pt' && voice.name.toLowerCase().includes('brazil'))
        );

        let selectedVoice = null;

        if (ptBRVoices.length === 0) {
          // Se não houver vozes pt-BR, usar qualquer voz em português
          const ptVoices = voices.filter(voice =>
            voice.lang === 'pt' || voice.lang.startsWith('pt-')
          );
          if (ptVoices.length > 0) {
            selectedVoice = ptVoices[0];
          }
        } else {
          // Priorizar vozes mais naturais (geralmente vozes femininas e com nomes específicos)
          const preferredNames = ['maria', 'francisca', 'heloisa', 'google', 'neural', 'premium'];
          const naturalVoices = ptBRVoices.filter(voice =>
            preferredNames.some(name => voice.name.toLowerCase().includes(name))
          );

          // Se encontrou vozes preferidas, usar a primeira
          if (naturalVoices.length > 0) {
            selectedVoice = naturalVoices[0];
          } else {
            // Caso contrário, preferir vozes femininas (geralmente mais naturais)
            const femaleVoices = ptBRVoices.filter(voice => {
              const name = voice.name.toLowerCase();
              return name.includes('maria') ||
                name.includes('francisca') ||
                name.includes('heloisa') ||
                name.includes('zira');
            });

            if (femaleVoices.length > 0) {
              selectedVoice = femaleVoices[0];
            } else {
              // Por último, usar qualquer voz em pt-BR
              selectedVoice = ptBRVoices[0];
            }
          }
        }

        // Se ainda não encontrou, usar a primeira voz disponível
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }

        voiceRef.current = selectedVoice;

        voiceRef.current = selectedVoice;
      };

      // Carregar vozes (pode ser assíncrono em alguns navegadores)
      loadVoices();

      // Alguns navegadores carregam vozes de forma assíncrona
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    // Limpar ao desmontar
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [id, API_BASE]);

  const speakText = (text) => {
    if (!synthRef.current) {
      alert('Seu navegador não suporta a funcionalidade de voz. Tente usar Chrome, Edge ou Safari.');
      return;
    }

    // Parar qualquer fala anterior
    synthRef.current.cancel();

    // Aguardar um pouco para garantir que a voz foi carregada
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);

      // Configurar idioma
      utterance.lang = 'pt-BR';

      // Ajustar parâmetros para voz mais natural e agradável
      utterance.rate = 0.8; // Velocidade mais lenta (mais natural e fácil de entender)
      utterance.pitch = 1.05; // Tom ligeiramente mais alto (mais agradável, menos robótico)
      utterance.volume = 1;

      // Usar a voz selecionada se disponível
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
        utterance.lang = voiceRef.current.lang;
      }

      utterance.text = text;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }, 100);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    let textToSpeak = '';

    if (currentView === 'intro' && tutorial?.introduction) {
      textToSpeak = `${tutorial.title}. ${tutorial.description || ''} ${tutorial.introduction}`.trim();
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      const step = tutorial?.steps?.[stepIndex];
      if (step) {
        textToSpeak = `Passo ${step.step}: ${step.title}. ${step.description}`;
      }
    } else if (currentView === 'conclusion' && tutorial?.conclusion) {
      textToSpeak = tutorial.conclusion;
    }

    if (textToSpeak) {
      speakText(textToSpeak);
    }
  };

  const handleNext = () => {
    if (!tutorial) return;
    setImageError(false); // Resetar erro de imagem ao mudar de passo

    if (currentView === 'intro') {
      if (tutorial.steps && tutorial.steps.length > 0) {
        setCurrentView('step-0');
      } else if (tutorial.conclusion) {
        setCurrentView('conclusion');
      }
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      if (tutorial.steps && stepIndex < tutorial.steps.length - 1) {
        setCurrentView(`step-${stepIndex + 1}`);
      } else if (tutorial.conclusion) {
        setCurrentView('conclusion');
      }
    }
    stopSpeaking();
  };

  const handlePrevious = () => {
    if (!tutorial) return;
    setImageError(false); // Resetar erro de imagem ao mudar de passo

    if (currentView === 'conclusion') {
      if (tutorial.steps && tutorial.steps.length > 0) {
        setCurrentView(`step-${tutorial.steps.length - 1}`);
      } else if (tutorial.introduction) {
        setCurrentView('intro');
      }
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      if (stepIndex > 0) {
        setCurrentView(`step-${stepIndex - 1}`);
      } else if (tutorial.introduction) {
        setCurrentView('intro');
      }
    }
    stopSpeaking();
  };

  const handleBack = () => {
    stopSpeaking();
    navigate('/tutorials');
  };

  const canGoNext = () => {
    if (!tutorial) return false;
    if (currentView === 'intro') {
      return tutorial.steps?.length > 0 || tutorial.conclusion;
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      return stepIndex < tutorial.steps.length - 1 || tutorial.conclusion;
    }
    return false;
  };

  const canGoPrevious = () => {
    if (!tutorial) return false;
    if (currentView === 'conclusion') {
      return tutorial.steps?.length > 0 || tutorial.introduction;
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      return stepIndex > 0 || tutorial.introduction;
    }
    return false;
  };

  if (loading) {
    return (
      <div className="tutorial-detail-page">
        <div className="tutorial-detail-loading">Carregando tutorial...</div>
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="tutorial-detail-page">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft className="back-icon" />
          Voltar
        </button>
        <div className="tutorial-detail-error">{error || 'Tutorial não encontrado'}</div>
      </div>
    );
  }

  const Icon = iconMap[tutorial.icon] || Phone;
  const colors = colorMap[tutorial.color] || colorMap.blue;

  // Determinar qual conteúdo mostrar
  let currentStep = null;
  let viewContent = null;

  if (currentView === 'intro') {
    viewContent = (
      <div className="tutorial-view-content">
        <div className="tutorial-detail-header">
          <div
            className="tutorial-detail-icon-container"
            style={{
              backgroundColor: colors.bg,
              color: colors.text
            }}
          >
            <Icon className="tutorial-detail-icon" />
          </div>
          <h1 className="tutorial-detail-title">{tutorial.title}</h1>
          <p className="tutorial-detail-description">{tutorial.description}</p>
        </div>
        {tutorial.introduction && (
          <div className="tutorial-introduction">
            <p className="introduction-text">{tutorial.introduction}</p>
          </div>
        )}
      </div>
    );
  } else if (currentView.startsWith('step-')) {
    const stepIndex = parseInt(currentView.split('-')[1]);
    currentStep = tutorial.steps?.[stepIndex];
    if (currentStep) {
      viewContent = (
        <div className="tutorial-view-content">
          <div className="step-view-header">
            <div className="step-number-large">{currentStep.step}</div>
            <h2 className="step-title-large">{currentStep.title}</h2>
          </div>
          {currentStep.image && !imageError ? (
            <div className="step-image-container">
              <img
                src={currentStep.image}
                alt={`Passo ${currentStep.step}: ${currentStep.title}`}
                className="step-image"
                onError={() => {
                  console.error('Erro ao carregar imagem:', currentStep.image);
                  setImageError(true);
                }}
                onLoad={() => setImageError(false)}
              />
            </div>
          ) : (
            <div className="step-image-placeholder">
              <span className="placeholder-text">
                {currentStep.image && imageError
                  ? `Imagem não encontrada: ${currentStep.image}`
                  : `Imagem do passo ${currentStep.step}`}
              </span>
            </div>
          )}
          <div className="step-description-large">
            <p>{currentStep.description}</p>
          </div>
        </div>
      );
    }
  } else if (currentView === 'conclusion') {
    viewContent = (
      <div className="tutorial-view-content">
        <div className="tutorial-conclusion-view">
          <h2 className="conclusion-title">Conclusão</h2>
          <p className="conclusion-text-large">{tutorial.conclusion}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tutorial-detail-page">
      <button onClick={handleBack} className="back-button">
        <ArrowLeft className="back-icon" />
        Voltar
      </button>

      <div className="tutorial-view-container">
        {viewContent}

        <div className="tutorial-controls">
          <button
            onClick={handleListen}
            className="listen-button"
            aria-label={isSpeaking ? 'Parar áudio' : 'Ouvir texto'}
          >
            {isSpeaking ? (
              <>
                <Pause className="listen-icon" />
                <span>Parar</span>
              </>
            ) : (
              <>
                <Play className="listen-icon" />
                <span>Ouvir</span>
              </>
            )}
          </button>

          <div className="navigation-buttons">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious()}
              className="nav-button nav-button-prev"
              aria-label="Passo anterior"
            >
              <ChevronLeft className="nav-icon" />
              <span>Anterior</span>
            </button>

            <div className="step-indicator">
              {tutorial.introduction && (
                <span
                  className={currentView === 'intro' ? 'active' : ''}
                  title="Introdução"
                >
                  Intro
                </span>
              )}
              {tutorial.steps?.map((step, index) => (
                <span
                  key={index}
                  className={currentView === `step-${index}` ? 'active' : ''}
                  title={`Passo ${step.step}: ${step.title}`}
                >
                  {step.step || index + 1}
                </span>
              ))}
              {tutorial.conclusion && (
                <span
                  className={currentView === 'conclusion' ? 'active' : ''}
                  title="Conclusão"
                >
                  Fim
                </span>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="nav-button nav-button-next"
              aria-label="Próximo passo"
            >
              <span>Próximo</span>
              <ChevronRight className="nav-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
