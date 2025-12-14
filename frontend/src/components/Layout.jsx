import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Importa seu Header existente
import Footer from './Footer'; // Importa o novo Footer

export default function Layout() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Fixo no topo */}
      <Header />

      {/* Área do conteúdo principal */}
      {/* paddingBottom: 90px garante que o conteúdo não fique escondido atrás do footer */}
      <main className="content" style={{ flex: 1, paddingBottom: '90px', width: '100%' }}>
        <Outlet /> 
      </main>

      {/* Footer Fixo embaixo */}
      <Footer />
    </div>
  );
}