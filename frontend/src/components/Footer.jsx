import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  // Não renderizar o footer na página home
  if (isHome) {
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <footer className="app-footer">
      {/* Botão VOLTAR (Esquerda) */}
      <button 
        className="footer-button footer-button-back" 
        onClick={handleBack}
        aria-label="Voltar"
      >
        <ArrowLeft className="footer-icon" />
        <span className="footer-text">Voltar</span>
      </button>

      {/* Botão HOME (Direita) */}
      <button 
        className="footer-button footer-button-home" 
        onClick={handleHome}
        aria-label="Início"
      >
        <Home className="footer-icon" />
        <span className="footer-text">Início</span>
      </button>
    </footer>
  );
}