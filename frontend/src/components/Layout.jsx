import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Importando seu Header existente
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Fixo ou no topo */}
      <Header />

      {/* Área do conteúdo principal */}
      {/* paddingBottom garante que o Footer não esconda o final da página */}
      <main className="content" style={{ flex: 1, paddingBottom: '90px' }}>
        <Outlet /> 
      </main>

      {/* Footer Fixo */}
      <Footer />
    </div>
  );
}