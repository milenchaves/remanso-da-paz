import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Importe o arquivo CSS (supondo que o nome seja Home.css ou style.css)
// import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();
  const [versiculo, setVersiculo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchVersiculo = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE}/api/versiculo-do-dia`);
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
    // Atualiza a cada hora para garantir que, quando o backend trocar, o frontend atualize sozinho
    const interval = setInterval(fetchVersiculo, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <main className="container">
        
        {/* Cabeçalho */}
        <header className="header">
          <h1>Remanso da Paz</h1>
          <p>Bem-vindo! Escolha uma atividade</p>
        </header>

        {/* Versículo do Dia */}
        <section className="versiculo-card">
          <h2>Versículo do Dia</h2>
          <div className="versiculo-content">
            {loading ? (
              <p className="texto-versiculo">Carregando versículo...</p>
            ) : error ? (
              <p className="texto-versiculo" style={{ color: 'red' }}>{error}</p>
            ) : versiculo ? (
              <>
                <div className="texto-versiculo" dangerouslySetInnerHTML={{ __html: versiculo.texto }} />
                <p className="referencia">{versiculo.livro}</p>
              </>
            ) : (
              <p className="texto-versiculo">Nenhum versículo disponível</p>
            )}
          </div>
          <button className="botao-ouvir">Ouvir Versículo</button>
        </section>

        {/* Botões de Navegação */}
        <section className="botoes-navegacao">
          
          {/* Card Tutoriais */}
          <div className="card-navegacao tutorial-card">
            {/* Ícone substituindo a imagem azul/roxa */}
            <div className="icone-principal">
               
            </div>
            <h3>Tutoriais</h3>
          </div>

          {/* Card Jogos */}
            <div
              className="card-navegacao jogos-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate('/games')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate('/games');
              }}
            >
              {/* Ícone substituindo a imagem roxa/rosa */}
              <div className="icone-principal">

              </div>
              <h3>Jogos</h3>
            </div>
          
        </section>
        
      </main>

     
    </div>
  );
};

export default Home;