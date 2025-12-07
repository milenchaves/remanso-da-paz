import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { bibleAPI } from '../../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [versiculo, setVersiculo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const fetchVersiculo = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await bibleAPI.getDailyVerse();
      if (res.data && res.data.sucesso) {
        setVersiculo(res.data.dados);
      } else {
        setError('Resposta inválida do servidor');
      }
    } catch (err) {
      setError(err.response?.data?.mensagem || err.message || 'Erro ao buscar versículo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVersiculo();
    const interval = setInterval(fetchVersiculo, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const ouvirVersiculo = async () => {
    if (!versiculo) return;

    setAudioLoading(true);

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const textoLimpo = versiculo.texto.replace(/<[^>]*>/g, '');
      
      const textoCompleto = `${versiculo.livro}. ${textoLimpo}`;

      console.log('Gerando áudio para:', textoCompleto);

      const response = await fetch('http://localhost:3000/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textoCompleto,
          voice: 'nova' 
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar áudio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        alert('Erro ao reproduzir áudio');
      };

      await audio.play();

    } catch (error) {
      console.error('Erro ao gerar áudio:', error);
      alert('Erro ao gerar áudio do versículo. Verifique se o backend está rodando na porta 3000.');
    } finally {
      setAudioLoading(false);
    }
  };

  const pararAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="home-page">
      <div className="bem-vindo">
        <h1 className="home-title">Seja bem-vindo!</h1>
      </div>
      <main className="container">
        <section className="versiculo-card">
          <h2>Versículo do Dia</h2>
          <div className="versiculo-content">
            {loading ? (
              <p className="texto-versiculo">Carregando versículo...</p>
            ) : error ? (
              <p className="texto-versiculo error-text">{error}</p>
            ) : versiculo ? (
              <>
                <div className="texto-versiculo" dangerouslySetInnerHTML={{ __html: versiculo.texto }} />
                <p className="referencia">{versiculo.livro}</p>
              </>
            ) : (
              <p className="texto-versiculo">Nenhum versículo disponível</p>
            )}
          </div>
          
          {}
          {!isPlaying ? (
            <button 
              className="botao-ouvir" 
              onClick={ouvirVersiculo}
              disabled={audioLoading || !versiculo}
            >
              {audioLoading ? '⏳ Carregando áudio...' : '🔊 Ouvir Versículo'}
            </button>
          ) : (
            <button 
              className="botao-ouvir parar" 
              onClick={pararAudio}
            >
              ⏹️ Parar
            </button>
          )}
        </section>

        <section className="botoes-navegacao">
          
          <div 
            className="card-navegacao tutorial-card"
            role="button"
            tabIndex={0}
            onClick={() => alert('Tutoriais em desenvolvimento')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') alert('Tutoriais em desenvolvimento');
            }}
          >
            <div className="icone-principal">📚</div>
            <h3>Tutoriais</h3>
            <p className="card-subtitle">Aprenda com guias passo a passo</p>
          </div>

          <div
            className="card-navegacao jogos-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/games')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/games');
            }}
          >
            <div className="icone-principal">🎮</div>
            <h3>Jogos</h3>
            <p className="card-subtitle">Divirta-se aprendendo</p>
          </div>
          
        </section>
        
      </main>
    </div>
  );
};

export default Home;