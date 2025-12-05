import Header from "./components/Header";
import GamesList from "./games/GamesList";
import "./App.css";

function App() {
  return (
    <>
      <Header /> {/* Header fixo no topo */}
      <main className="content">
        <GamesList /> {/* Sua tela de jogos aqui */}
      </main>
    </>
  );
}

export default App;
