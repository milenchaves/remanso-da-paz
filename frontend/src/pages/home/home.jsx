import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { bibleAPI } from '../../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [versiculo, setVersiculo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="home-page">
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
          <button 
            className="botao-ouvir" 
            onClick={() => alert('Funcionalidade de áudio em desenvolvimento')}
          >
            Ouvir Versículo
          </button>
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