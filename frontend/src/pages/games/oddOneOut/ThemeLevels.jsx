import { useEffect, useState } from "react";
import "./ThemeLevels.css";

export default function ThemeLevels({ levelData, onSuccess, onError, resetSignal }) {
  const [grid, setGrid] = useState([]);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (levelData) generateGrid();
  }, [levelData, resetSignal]);

  function generateGrid() {
    setLocked(false);
    setMessage("");

    const normalIcons = levelData.normal;
    const gridSize = levelData.gridSize;
    const intruderIcon = levelData.intruder;
    
    const allIcons = [];

    for (let i = 0; i < gridSize; i++) {
      const randomIndex = Math.floor(Math.random() * normalIcons.length);
      allIcons.push({ src: normalIcons[randomIndex], intruder: false });
    }

    const intruderIndex = Math.floor(Math.random() * allIcons.length);
    allIcons[intruderIndex] = { src: intruderIcon, intruder: true };

    for (let i = allIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIcons[i], allIcons[j]] = [allIcons[j], allIcons[i]];
    }

    setGrid(allIcons);
  }

  function handleClick(item) {
    if (locked) return;
    setLocked(true);

    if (item.intruder) {
      setTimeout(() => onSuccess(), 900);
    } else {
      setTimeout(() => onError(), 900);
    }
  }

  return (
    <>
      <div className="odd-grid">
        {grid.map((item, index) => (
          <div 
            key={index} 
            className={`odd-card ${locked ? "disabled" : ""}`} 
            onClick={() => handleClick(item)}
          >
            <img src={item.src} alt="ícone"/>
          </div>
        ))}
      </div>
      {message && <p className={`odd-message ${message.includes('Acertou')?'success':'error'}`}>{message}</p>}
    </>
  );
}