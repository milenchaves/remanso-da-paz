import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import GamesList from "./pages/games/GamesList";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
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
