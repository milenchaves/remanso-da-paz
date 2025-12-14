import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Fixo ou no topo */}
      <Header />

      {/* Área do conteúdo principal */}
      <main className="content" style={{ flex: 1, paddingBottom: isHome ? '0' : '90px' }}>
        <Outlet /> 
      </main>

      {/* Footer Fixo - não aparece na home */}
      {!isHome && <Footer />}
    </div>
  );
}