import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TutorialsList.css';
import { 
  Phone, MessageSquare, Camera, Volume2, Music, Mic, Image, 
  Video, Search, Sparkles, Images 
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

export default function TutorialsList() {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE}/api/tutoriais`);
        if (res.data && res.data.sucesso) {
          setTutorials(res.data.dados);
        } else {
          setError('Resposta inválida do servidor');
        }
      } catch (err) {
        setError(err.response?.data?.mensagem || err.message || 'Erro ao buscar tutoriais');
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, [API_BASE]);

  const handleTutorialClick = (id) => navigate(`/tutorials/${id}`);

  if (loading) return <div className="tutorials-page"><div className="tutorials-loading">Carregando tutoriais...</div></div>;
  if (error) return <div className="tutorials-page"><div className="tutorials-error">{error}</div></div>;

  return (
    <div className="tutorials-page">
      <div className="tutorials-header">
        <h1 className="tutorials-title">Tutoriais</h1>
      </div>

      <div className="tutorials-grid">
        {tutorials.map((tutorial) => {
          const Icon = iconMap[tutorial.icon] || Phone;
          const colors = colorMap[tutorial.color] || colorMap.blue;
          
          return (
            <button
              key={tutorial.id}
              onClick={() => handleTutorialClick(tutorial.id)}
              className="tutorial-card"
              style={{ '--tutorial-bg': colors.bg, '--tutorial-text': colors.text }}
            >
              <div className="tutorial-card-content">
                <div className="tutorial-icon-container" style={{ backgroundColor: colors.bg, color: colors.text }}>
                  <Icon className="tutorial-icon" />
                </div>
                <h3 className="tutorial-title">{tutorial.title}</h3>
                <p className="tutorial-description">{tutorial.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}