import "./timer.css";
import pauseSVG from "@assets/pause.svg";
import mine from "@assets/mine.svg";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

const Timer = ({ time, isPaused, setIsPaused, marked }) => {
  const { level } = useContext(AppContext);
  const pause = () => {
    setIsPaused((p) => !p);
  };

  return (
    <div className="timer">
      <div className="content">
        <div className="digits">
          {("0" + Math.floor(time / 60000)).slice(-2)}:
        </div>
        <div className="digits">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </div>
        <div className="digits mili-sec">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </div>
        <div
          className={isPaused ? "digits pause" : "digits pause actif"}
          onClick={pause}
        >
          <img src={pauseSVG} alt="pause" />
        </div>
      </div>
      <div className="countMine">
        <img src={mine} alt="mine" className="counterMineSvg" />
        <span> : {level.bombs - marked.length}</span>
      </div>
    </div>
  );
};

export default Timer;
