import "./LevelChoice.css";
import { _LEVELS } from "../../config.js";

/**
 *
 * @param {Function} setLevel
 * @returns
 */
const LevelChoice = ({ setLevel }) => {
  const handleClick = (level) => {
    setLevel(level);
  };

  return (
    <>
      <h2>Choix du niveau</h2>
      <div className="cardContainer">
        {_LEVELS.map((level) => (
          <div
            className="card"
            onClick={() => handleClick({ ...level, key: new Date() })}
            key={level.name}
          >
            {level.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default LevelChoice;
