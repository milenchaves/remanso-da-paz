import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import GamesList from "./pages/games/GamesList";

function App() {
  return (
    <BrowserRouter>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
