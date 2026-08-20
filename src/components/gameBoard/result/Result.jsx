import { useContext, useEffect } from "react";
import { postData } from "../../../utils/firebase";
import "./Result.css";
import AppContext from "../../../contexts/AppContext";

const Result = ({ time, bomb }) => {
  const { level, setScores } = useContext(AppContext);

  useEffect(() => {
    if (!bomb && time > 0) {
      let data = {
        name: localStorage.getItem("name"),
        time: time,
        level: level.name,
      };
      postData(data, setScores);
    }
  }, [bomb, time, level.name]);

  return (
    <div className="result">
      {bomb ? (
        <>Vous avez échoué !</>
      ) : (
        <div>
          vous avez réusssi en{" "}
          <span>{("0" + Math.floor(time / 60000)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
          <span className="mili-sec">
            {Math.floor((time % 1000) / 10).toString().padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
};

export default Result;
