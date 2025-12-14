import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Removemos useNavigate pois o BackButton cuida disso
import axios from 'axios';
import './TutorialDetail.css';
import {
  Phone, MessageSquare, Camera, Volume2, Music, Mic, Image,
  Video, Search, Sparkles, Images, Play, Pause, ChevronLeft, ChevronRight
} from 'lucide-react';

const iconMap = {
  phone: Phone, message: MessageSquare, camera: Camera, volume: Volume2,
  music: Music, mic: Mic, image: Image, video: Video, search: Search,
  bot: Sparkles, images: Images
};

const colorMap = {
  blue: { bg: '#DBEAFE', text: '#1E40AF' },
  green: { bg: '#D1FAE5', text: '#065F46' },
  purple: { bg: '#E9D5FF', text: '#6B21A8' },
  orange: { bg: '#FED7AA', text: '#9A3412' },
  red: { bg: '#FEE2E2', text: '#991B1B' }
};

const getInitialView = (tutorial) => {
  if (!tutorial) return 'step-0';
  if (tutorial.introduction) return 'intro';
  if (tutorial.steps && tutorial.steps.length > 0) return 'step-0';
  if (tutorial.conclusion) return 'conclusion';
  return 'step-0';
};

export default function TutorialDetail() {
  const { id } = useParams();
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

    if (id) fetchTutorial();

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const voices = synthRef.current.getVoices();
        const ptBRVoices = voices.filter(v => v.lang.includes('pt-BR') || (v.lang === 'pt' && v.name.toLowerCase().includes('brazil')));
        let selected = ptBRVoices.find(v => ['google', 'neural', 'maria'].some(n => v.name.toLowerCase().includes(n))) || ptBRVoices[0] || voices[0];
        voiceRef.current = selected;
      };
      loadVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }
    return () => synthRef.current?.cancel();
  }, [id, API_BASE]);

  const speakText = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.pitch = 1.05;
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }, 100);
  };

  const stopSpeaking = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
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
      if (step) textToSpeak = `Passo ${step.step}: ${step.title}. ${step.description}`;
    } else if (currentView === 'conclusion' && tutorial?.conclusion) {
      textToSpeak = tutorial.conclusion;
    }
    if (textToSpeak) speakText(textToSpeak);
  };

  const handleNext = () => {
    if (!tutorial) return;
    setImageError(false);
    if (currentView === 'intro') {
      setCurrentView(tutorial.steps?.length > 0 ? 'step-0' : 'conclusion');
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      setCurrentView(stepIndex < tutorial.steps.length - 1 ? `step-${stepIndex + 1}` : 'conclusion');
    }
    stopSpeaking();
  };

  const handlePrevious = () => {
    if (!tutorial) return;
    setImageError(false);
    if (currentView === 'conclusion') {
      setCurrentView(tutorial.steps?.length > 0 ? `step-${tutorial.steps.length - 1}` : 'intro');
    } else if (currentView.startsWith('step-')) {
      const stepIndex = parseInt(currentView.split('-')[1]);
      setCurrentView(stepIndex > 0 ? `step-${stepIndex - 1}` : 'intro');
    }
    stopSpeaking();
  };

  const handleJumpTo = (viewName) => {
    stopSpeaking();
    setImageError(false);
    setCurrentView(viewName);
  };

  const canGoNext = () => {
    if (!tutorial) return false;
    if (currentView === 'intro') return tutorial.steps?.length > 0 || tutorial.conclusion;
    if (currentView.startsWith('step-')) {
      const idx = parseInt(currentView.split('-')[1]);
      return idx < tutorial.steps.length - 1 || tutorial.conclusion;
    }
    return false;
  };

  const canGoPrevious = () => {
    if (!tutorial) return false;
    if (currentView === 'conclusion') return tutorial.steps?.length > 0 || tutorial.introduction;
    if (currentView.startsWith('step-')) {
      const idx = parseInt(currentView.split('-')[1]);
      return idx > 0 || tutorial.introduction;
    }
    return false;
  };

  if (loading) return <div className="tutorial-detail-page"><div className="tutorial-detail-loading">Carregando tutorial...</div></div>;
  
  if (error || !tutorial) {
    return (
      <div className="tutorial-detail-page">
        <BackButton to="/tutorials" onClick={stopSpeaking} />
        <div className="tutorial-detail-error">{error || 'Tutorial não encontrado'}</div>
      </div>
    );
  }

  const Icon = iconMap[tutorial.icon] || Phone;
  const colors = colorMap[tutorial.color] || colorMap.blue;

  let viewContent = null;
  if (currentView === 'intro') {
    viewContent = (
      <div className="tutorial-view-content">
        <div className="tutorial-detail-header">
          <div className="tutorial-detail-icon-container" style={{ backgroundColor: colors.bg, color: colors.text }}>
            <Icon className="tutorial-detail-icon" />
          </div>
          <h1 className="tutorial-detail-title">{tutorial.title}</h1>
          <p className="tutorial-detail-description">{tutorial.description}</p>
        </div>
        {tutorial.introduction && <div className="tutorial-introduction"><p className="introduction-text">{tutorial.introduction}</p></div>}
      </div>
    );
  } else if (currentView.startsWith('step-')) {
    const stepIndex = parseInt(currentView.split('-')[1]);
    const currentStep = tutorial.steps?.[stepIndex];
    if (currentStep) {
      viewContent = (
        <div className="tutorial-view-content">
          <div className="step-view-header">
            <div className="step-number-large">{currentStep.step}</div>
            <h2 className="step-title-large">{currentStep.title}</h2>
          </div>
          {currentStep.image && !imageError ? (
            <div className="step-image-container">
              <img src={currentStep.image} alt={`Passo ${currentStep.step}`} className="step-image" 
                   onError={() => setImageError(true)} onLoad={() => setImageError(false)} />
            </div>
          ) : (
            <div className="step-image-placeholder">
               <span className="placeholder-text">{currentStep.image && imageError ? 'Imagem não encontrada' : `Imagem do passo ${currentStep.step}`}</span>
            </div>
          )}
          <div className="step-description-large"><p>{currentStep.description}</p></div>
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
      <div className="tutorial-view-container">
        {viewContent}

        <div className="tutorial-controls">
          <button onClick={handleListen} className="listen-button" aria-label={isSpeaking ? 'Parar áudio' : 'Ouvir texto'}>
            {isSpeaking ? <><Pause className="listen-icon" /><span>Parar</span></> : <><Play className="listen-icon" /><span>Ouvir</span></>}
          </button>

          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={!canGoPrevious()} className="nav-button nav-button-prev">
              <ChevronLeft className="nav-icon" /><span>Anterior</span>
            </button>

            <div className="step-indicator">
              {tutorial.introduction && (
                <span className={currentView === 'intro' ? 'active' : ''} onClick={() => handleJumpTo('intro')} title="Intro">Intro</span>
              )}
              {tutorial.steps?.map((step, index) => (
                <span key={index} className={currentView === `step-${index}` ? 'active' : ''} onClick={() => handleJumpTo(`step-${index}`)} title={`Passo ${step.step}`}>
                  {step.step || index + 1}
                </span>
              ))}
              {tutorial.conclusion && (
                <span className={currentView === 'conclusion' ? 'active' : ''} onClick={() => handleJumpTo('conclusion')} title="Fim">Fim</span>
              )}
            </div>

            <button onClick={handleNext} disabled={!canGoNext()} className="nav-button nav-button-next">
              <span>Próximo</span><ChevronRight className="nav-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}