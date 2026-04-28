import { useEffect, useState } from "react";
import "./App.css";
import LevelChoice from "./components/levelChoice/LevelChoice";
import { login, logout } from "./utils/firebase";
import { StorageService } from "./utils/StorageService";
import GameComponent from "./components/gameComponent/GameComponent";
import AppContext from "./contexts/AppContext";
import TopScores from "./components/topScores/TopScores";

function App() {
  const [level, setLevel] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [scores, setScores] = useState([]);
  const [name, setName] = useState(StorageService.getItem("name") || null);

  useEffect(() => {
    login(setScores);

    () => logout();
  }, []);

  const contextValue = {
    scores,
    setScores,
    level,
    setLevel,
    resetKey,
    setResetKey,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let nameInput = document.getElementById("name");
    StorageService.setItem("name", nameInput.value);
    setName(nameInput.value);
  };

  return (
    <AppContext value={contextValue}>
      <h1>Démineur</h1>
      {name ? (
        <>
          <h3>Bienvenue {name} !</h3>
          {level ? (
            <GameComponent level={level} key={resetKey} />
          ) : (
            <LevelChoice setLevel={setLevel} />
          )}
        </>
      ) : (
        <form className="nameInput" onSubmit={onSubmit}>
          <label htmlFor="name">Nom de joueur</label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength={20}
            minLength={3}
            required
          />
          <button type="submit">Valider</button>
        </form>
      )}
      <TopScores />
    </AppContext>
  );
}

export default App;
