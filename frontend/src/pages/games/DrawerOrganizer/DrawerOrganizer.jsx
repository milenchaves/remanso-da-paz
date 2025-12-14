import React, { useEffect, useState } from "react";
import "./DrawerOrganizer.css";

const ITEM_POOL = [
  { id: "whatsapp", label: "WhatsApp", category: "Comunicação", img: "/imgs/iconeWhatsApp.png" },
  { id: "phone", label: "Telefone", category: "Comunicação", img: "/imgs/phone.png" },
  { id: "pesquisar", label: "Pesquisar", category: "Pesquisa", img: "/imgs/pesquisar.png" },
  { id: "microfone", label: "Microfone", category: "Pesquisa", img: "/imgs/mic.jpg" },
  { id: "youtube", label: "YouTube", category: "Pesquisa", img: "/imgs/Youtube.png" },
  { id: "google", label: "Google", category: "Pesquisa", img: "/imgs/google.png" },
  { id: "camera", label: "Câmera", category: "Fotos", img: "/imgs/camera.jpg" },
  { id: "gallery", label: "Galeria", category: "Fotos", img: "/imgs/galeria.png" },
];

// Cores para as categorias (Visual Remanso da Paz)
const CATEGORY_STYLES = {
  "Comunicação": { color: "#E8F5E9", border: "#4CAF50", icon: "📞" },
  "Pesquisa": { color: "#E3F2FD", border: "#2196F3", icon: "🔎" },
  "Fotos": { color: "#FFF3E0", border: "#FF9800", icon: "📷" }
};

const DIFFICULTY_SIZES = { easy: 4, medium: 5, hard: 10 };

export default function DrawerOrganizer() {
  const [difficulty, setDifficulty] = useState("easy");
  const [items, setItems] = useState([]);
  const [placed, setPlaced] = useState({});
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null); // Novo: Para suporte a clique/toque

  useEffect(() => resetBoard(), [difficulty]);

  function shuffle(a) {
    return a
      .map((v) => ({ v, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((x) => x.v);
  }

  function resetBoard() {
    const size = DIFFICULTY_SIZES[difficulty] || 4;
    const pool = shuffle(ITEM_POOL).slice(0, size);
    setItems(pool);
    setPlaced({});
    setMessage("");
    setSelectedId(null);
  }

  // Retorna o src da imagem: prioriza `item.img` (ajusta caminhos relativos), senão `/imgs/{id}.png`
  function getImgSrc(item) {
    if (!item) return "";
    if (item.img || item.Image) {
      const raw = item.img || item.Image;
      if (raw.startsWith("/") || raw.startsWith("http")) return raw;
      if (raw.startsWith("./")) return raw.replace(/^\./, "");
      return raw.startsWith("imgs/") ? `/${raw}` : `/${raw}`;
    }
    return `/imgs/${item.id}.png`;
  }

  // --- Lógica de Arrastar (Desktop) ---
  function handleDragStart(e, id) {
    e.dataTransfer.setData("text/plain", id);
    setSelectedId(id); // Seleciona visualmente também
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  // --- Lógica Híbrida (Funciona para Drop e Clique) ---
  function attemptMove(id, targetCategory) {
    const item = items.find((it) => it.id === id);
    if (!item) return;

    if (item.category === targetCategory) {
      setPlaced((p) => ({ ...p, [id]: true }));
      setItems((prev) => prev.filter((it) => it.id !== id));
      setMessage("Muito bem! 🎉");
      setSelectedId(null);
    } else {
      setMessage("Ops! Tente outra caixa.");
      setTimeout(() => setMessage(""), 1500);
    }
  }

  function handleDrop(e, category) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    attemptMove(id, category);
  }

  // --- Lógica de Clique (Mobile/Acessibilidade) ---
  function handleItemClick(id) {
    if (selectedId === id) {
      setSelectedId(null); // Desmarcar se clicar de novo
    } else {
      setSelectedId(id);
      setMessage("Agora toque na caixa correta.");
    }
  }

  function handleZoneClick(category) {
    if (selectedId) {
      attemptMove(selectedId, category);
    }
  }

  const categories = ["Comunicação", "Pesquisa", "Fotos"];

  return (
    <div className="drawer-page">
      <header className="drawer-header">
        <div className="header-top">
             <h2>Organize a Gaveta</h2>
             <button className="btn-reset" onClick={resetBoard}>Reiniciar</button>
        </div>
        
        <div className="controls">
          <label>Nível:</label>
          <div className="difficulty-selector">
            {Object.keys(DIFFICULTY_SIZES).map((level) => (
                <button 
                    key={level}
                    className={`btn-level ${difficulty === level ? 'active' : ''}`}
                    onClick={() => setDifficulty(level)}
                >
                    {level === 'easy' ? 'Fácil' : level === 'medium' ? 'Médio' : 'Difícil'}
                </button>
            ))}
          </div>
        </div>
      </header>

      <p className="hint">
        {selectedId 
            ? "Agora clique na caixa onde este item deve ser guardado." 
            : "Clique em um item ou arraste-o para a caixa correta."}
      </p>

      {message && <div className={`message-banner ${message.includes("Ops") ? "error" : "success"}`}>{message}</div>}

      <div className="game-area">
        {/* Área de Itens (Bagunça) */}
        <div className="items-section">
            <h3>Itens Soltos</h3>
            <div className="items-grid">
            {items.map((it) => (
                <div
                key={it.id}
                className={`item-card ${selectedId === it.id ? "selected" : ""}`}
                draggable
                onDragStart={(e) => handleDragStart(e, it.id)}
                onClick={() => handleItemClick(it.id)}
                title={it.label}
                >
                <div className="item-media">
                  <img
                    src={getImgSrc(it)}
                    alt={it.label}
                    className="item-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.parentNode.querySelector('.fallback-emoji');
                      if (fallback) fallback.style.display = 'inline';
                    }}
                  />
                  <span className="fallback-emoji" style={{ display: 'none' }}>{it.emoji}</span>
                </div>
                <span className="label">{it.label}</span>
                </div>
            ))}
            {items.length === 0 && <div className="empty-state">Gaveta organizada! Parabéns! 🌟</div>}
            </div>
        </div>

        {/* Área de Caixas (Categorias) */}
        <div className="zones-section">
          {categories.map((cat) => (
            <div
              key={cat}
              className="zone-card"
              style={{ 
                  backgroundColor: CATEGORY_STYLES[cat].color,
                  borderColor: CATEGORY_STYLES[cat].border 
              }}
              onDrop={(e) => handleDrop(e, cat)}
              onDragOver={handleDragOver}
              onClick={() => handleZoneClick(cat)}
            >
              <div className="zone-header" style={{ color: CATEGORY_STYLES[cat].border }}>
                  <span className="zone-icon">{CATEGORY_STYLES[cat].icon}</span>
                  <span className="zone-title">{cat}</span>
              </div>
              
              <div className="zone-content">
                {Object.keys(placed)
                  .filter((id) => {
                    const found = ITEM_POOL.find((x) => x.id === id);
                    return found && found.category === cat;
                  })
                  .map((id) => {
                    const found = ITEM_POOL.find((x) => x.id === id);
                    return (
                      <div key={id} className="placed-mini-item" title={found.label}>
                        <img
                          src={getImgSrc(found)}
                          alt={found.label}
                          className="mini-img"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fb = e.currentTarget.parentNode.querySelector('.mini-emoji');
                            if (fb) fb.style.display = 'inline';
                          }}
                        />
                        <span className="mini-emoji" style={{ display: 'none' }}>{found.emoji}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}