import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import GamesList from "./pages/games/GamesList";
import Header from "./components/Header"; 
import TutorialsList from "./pages/tutorials/TutorialsList";
import TutorialDetail from "./pages/tutorials/TutorialDetail";
import OddOneOut from "./pages/games/oddOneOut/OddOneOut";
import TypingGame from "./pages/games/typing/TypingGame";
import MemoryGame from "./pages/games/memoryGame/MemoryGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/games/memoryGame" element={<MemoryGame />} />
          <Route path="/games/odd-one-out" element={<OddOneOut />} />
          <Route path="/games/typing" element={<TypingGame />} />          
          {/* Rotas de Tutoriais */}
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/tutorials/:id" element={<TutorialDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;