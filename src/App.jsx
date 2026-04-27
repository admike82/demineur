import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameBoard/GameBoard";
import LevelChoice from "./components/levelChoice/LevelChoice";

function App() {
  const [level, setLevel] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const handleClick = () => {
    setLevel(null);
    setResetKey(0);
  };

  const handleReset = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <>
      <h1>Démineur</h1>
      {level ? (
        <>
          <GameBoard key={resetKey} level={level} />
          <div>
            <button onClick={handleClick}>Changer de niveau</button>
            <button onClick={handleReset} className="reset">
              &#10227;
            </button>
          </div>
        </>
      ) : (
        <LevelChoice setLevel={setLevel} />
      )}
    </>
  );
}

export default App;
