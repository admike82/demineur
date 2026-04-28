import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { _LEVELS } from "../../config.js";
import "./TopScores.css";
function TopScores() {
  const { scores } = useContext(AppContext);

  return _LEVELS.map((level) => {
    let levelScores = scores
      .sort((a, b) => a.time - b.time)
      .filter((score, i) => score.level === level.name && i < 10);
    return (
      <>
        <table className="score">
          <thead>
            <tr>
              <th colSpan="2">{level.name}</th>
            </tr>
            <tr>
              <th>Nom</th>
              <th>Temps</th>
            </tr>
          </thead>
          <tbody>
            {levelScores.map((score, index) => (
              <tr key={index}>
                <td>
                  {index + 1}. {score.name}
                </td>
                <td>
                  <span>
                    {("0" + Math.floor(score.time / 60000)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((score.time / 1000) % 60)).slice(-2)}.
                  </span>
                  <span className="mili-sec">
                    {("0" + ((score.time / 10) % 100)).slice(-2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  });
}

export default TopScores;
