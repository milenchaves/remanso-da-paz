import Header from "./components/Header";
import GamesList from "./games/GamesList";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="content">
        <GamesList />
      </main>
    </>
  );
}

export default App;
