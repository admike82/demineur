import { useContext } from "react";
import GameBoard from "../gameBoard/GameBoard";
import AppContext from "../../contexts/AppContext";

const GameComponent = () => {
  const { setLevel, setResetKey } = useContext(AppContext);
  const handleClick = () => {
    setLevel(null);
    setResetKey(0);
  };

  const handleReset = () => {
    setResetKey((k) => k + 1);
  };
  return (
    <>
      <GameBoard />
      <div>
        <button onClick={handleClick}>Changer de niveau</button>
        <button onClick={handleReset} className="reset">
          &#10227;
        </button>
      </div>
    </>
  );
};

export default GameComponent;
