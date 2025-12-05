import "./Header.css";

export default function Header() {
  return (
    <header 
      className="header" 
      role="banner"
      aria-label="Cabeçalho principal"
    >
      <div className="header-content">
        <img 
          src="/logoremansoapp.png"
          alt="Logo do aplicativo: Um ícone circular com gradiente de verde-água e azul. 
          No centro, uma mão em tom pêssego segura um smartphone azul escuro. 
          Um ícone triangular de Play em azul escuro está visível na tela do celular"
          className="logo"
          width="60"
          height="60"
          aria-hidden="false"
        />
        <h1 className="title" tabIndex="0">
          Simplifica
        </h1>
      </div>
    </header>
  );
}