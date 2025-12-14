import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import GamesList from "./pages/games/GamesList";
import Header from "./components/Header";
import TutorialsList from "./pages/tutorials/TutorialsList";
import TutorialDetail from "./pages/tutorials/TutorialDetail";
import OddOneOut from "./pages/games/oddOneOut/OddOneOut";
import MemoryGame from "./pages/games/memoryGame/MemoryGame";
import TypingGame from "./pages/games/typing/TypingGame";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/games/odd-one-out" element={<OddOneOut />} />
          <Route path="/games/memory-game" element={<MemoryGame />} />
          <Route path="/games/typing" element={<TypingGame />} />
          
          {/* Rotas de Tutoriais */}
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/tutorials/:id" element={<TutorialDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;