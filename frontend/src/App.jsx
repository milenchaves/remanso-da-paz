import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import GamesList from "./pages/games/GamesList";
import TutorialsList from "./pages/tutorials/TutorialsList";
import TutorialDetail from "./pages/tutorials/TutorialDetail";
import OddOneOut from "./pages/games/oddOneOut/OddOneOut";
<<<<<<< HEAD
import DrawerOrganizer from "./pages/games/DrawerOrganizer/DrawerOrganizer";
=======
import MemoryGame from "./pages/games/memoryGame/MemoryGame";
>>>>>>> 928d1558bba7cc44a93124f52ae6e2021d88cfeb

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          
          <Route path="/" element={<Home />} />
          
          {/* Rotas de Jogos */}
          <Route path="/games" element={<GamesList />} />
          <Route path="/games/odd-one-out" element={<OddOneOut />} />
<<<<<<< HEAD
          <Route path="/games/DrawerOrganizer" element={<DrawerOrganizer/>} />
=======
          <Route path="/games/memory-game" element={<MemoryGame />} />
          
          {/* Rotas de Tutoriais */}
>>>>>>> 928d1558bba7cc44a93124f52ae6e2021d88cfeb
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/tutorials/:id" element={<TutorialDetail />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;