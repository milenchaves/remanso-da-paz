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
      <section className="frase-educativa">
        <p className="frase-texto">Aprender é uma jornada contínua. Cada passo te aproxima de seus objetivos!</p>
      </section>
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
          
          {!isPlaying ? (
            <button 
              className="botao-ouvir" 
              onClick={ouvirVersiculo}
              disabled={audioLoading || !versiculo}
            >
              {audioLoading ? 'Carregando áudio...' : 'Ouvir Versículo'}
            </button>
          ) : (
            <button 
              className="botao-ouvir parar" 
              onClick={pararAudio}
            >
              Parar
            </button>
          )}
        </section>

        <section className="botoes-navegacao">
          
          {/* Card Tutoriais */}
          <div
            className="card-navegacao tutorial-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/tutorials')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/tutorials');
            }}
          >
            <div className="icone-principal">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5C4 18.837 4.263 18.201 4.732 17.732C5.201 17.263 5.837 17 6.5 17H20" stroke="#7B68EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20V22H6.5C5.837 22 5.201 21.737 4.732 21.268C4.263 20.799 4 20.163 4 19.5V4.5C4 3.837 4.263 3.201 4.732 2.732C5.201 2.263 5.837 2 6.5 2Z" stroke="#7B68EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7H16" stroke="#7B68EE" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 11H16" stroke="#7B68EE" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Tutoriais</h3>
            <p className="card-subtitle">Aprenda a usar seu celular</p>
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
            <div className="icone-principal">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="20" height="12" rx="2.5" stroke="#F15BB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 10H8M6 14H8" stroke="#F15BB5" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="16.5" cy="11" r="1.5" fill="none" stroke="#F15BB5" strokeWidth="2.5"/>
                <circle cx="19.5" cy="13" r="1.5" fill="none" stroke="#F15BB5" strokeWidth="2.5"/>
                <path d="M10 8V10M10 14V16" stroke="#F15BB5" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 10L10 12L8 14" stroke="#F15BB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 10L10 12L12 14" stroke="#F15BB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Jogos</h3>
            <p className="card-subtitle">Pratique com jogos divertidos</p>
          </div>
          
        </section>
        
      </main>
    </div>
  );
};

export default Home;