import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import GamesList from "./pages/games/GamesList";
import TutorialsList from "./pages/tutorials/TutorialsList";
import TutorialDetail from "./pages/tutorials/TutorialDetail";

function App() {
  return (
    <BrowserRouter>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/tutorials/:id" element={<TutorialDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
