import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { _LEVELS } from "../../config.js";
import "./TopScores.css";
function TopScores() {
  const { scores } = useContext(AppContext);

  return _LEVELS.map((level) => {
    let levelScores = scores
      .sort((a, b) => a.time - b.time)
      .filter((score) => score.level === level.name)
      .slice(0, 10);
    return (
      <table key={level.name} className="score">
        <thead>
          <tr>
            <th colSpan="2">Top 10 - {level.name}</th>
          </tr>
          <tr>
            <th>Nom</th>
            <th>Temps</th>
          </tr>
        </thead>
        <tbody>
          {levelScores.map((score, index) => (
            <tr key={`${score.name}-${score.time}`}>
              <td>
                {index + 1}. {score.name}
              </td>
              <td>
                <span>{("0" + Math.floor(score.time / 60000)).slice(-2)}:</span>
                <span>
                  {("0" + Math.floor((score.time / 1000) % 60)).slice(-2)}.
                </span>
                  <span className="mili-sec">
                    {Math.floor((score.time % 1000) / 10).toString().padStart(2, "0")}
                  </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  });
}

export default TopScores;
