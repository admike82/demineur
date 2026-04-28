import { useContext, useEffect } from "react";
import { postData } from "../../../utils/firebase";
import "./Result.css";
import AppContext from "../../../contexts/AppContext";

const Result = ({ time, bomb }) => {
  const { level, setScores } = useContext(AppContext);

  useEffect(() => {
    if (!bomb) {
      let data = {
        name: localStorage.getItem("name"),
        time: time,
        level: level.name,
      };
      postData(data, setScores);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {("0" + ((time / 10) % 100)).slice(-2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Result;
