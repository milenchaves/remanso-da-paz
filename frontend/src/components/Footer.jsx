import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleBack = () => {
    if (!isHome) {
      navigate(-1);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <footer className="app-footer">
      {/* Botão VOLTAR (Esquerda) */}
      <button 
        className="footer-button" 
        onClick={handleBack}
        style={{ opacity: isHome ? 0.3 : 1, cursor: isHome ? 'default' : 'pointer' }}
        aria-label="Voltar"
        disabled={isHome}
      >
        <ArrowLeft className="footer-icon" />
        <span className="footer-text"> Voltar</span>
      </button>

      {/* Botão HOME (Direita) */}
      <button 
        className={`footer-button ${isHome ? 'active' : ''}`} 
        onClick={handleHome}
        aria-label="Início"
      >
        <Home className="footer-icon" />
        {/* Se quiser texto no Home também, descomente abaixo: */}
        {/* <span className="footer-text">Início</span> */}
      </button>
    </footer>
  );
}