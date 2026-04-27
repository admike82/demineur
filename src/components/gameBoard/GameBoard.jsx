import { useEffect, useState } from "react";
import "./GameBoard.css";
import Timer from "../timer/Timer";
import { dataGameBoard, generateBombs } from "../../utils/gameBoardUtils";
import Context from "../../contexts/Context";
import Row from "./row/Row";
import Result from "./result/Result";

/**
 *
 * @param {Object} level
 * @returns
 */
const GameBoard = ({ level }) => {
  const [game, setGame] = useState(dataGameBoard(level));
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [marked, setMarked] = useState([]);
  const [asked, setAsked] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [end, setEnd] = useState(false);
  const [clean, setClean] = useState([]);
  const [bomb, setBomb] = useState(null);

  if (bomb || clean.length + level.bombs === level.columns * level.lines) {
    if (!end) {
      setEnd(true);
    }
  }

  useEffect(() => {
    let interval = null;

    if (!end && !isPaused && started) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused, end, started]);

  const checkAround = (y, x, tmp) => {
    let voidCell = [];
    for (let j = x - 1; j <= x + 1; j++) {
      if (j !== -1 && j !== level.columns) {
        if (!clean.includes(`${y}-${j}`) && !tmp.includes(`${y}-${j}`)) {
          tmp.push(`${y}-${j}`);
          !game[y][j] && voidCell.push({ y: y, x: j });
        }
        for (let k = y - 1; k <= y + 1; k++) {
          if (k !== -1 && k !== level.lines) {
            if (!clean.includes(`${k}-${j}`) && !tmp.includes(`${k}-${j}`)) {
              tmp.push(`${k}-${j}`);
              !game[k][j] && voidCell.push({ y: k, x: j });
            }
          }
        }
      }
    }
    return { tmp, voidCell };
  };

  const checkCleanBorad = (y, x, tmp) => {
    let voidCell = [{ y: y, x: x }];

    while (voidCell.length > 0) {
      let arr = [];
      for (let i = 0; i < voidCell.length; i++) {
        let cell = voidCell[i];
        let result = checkAround(cell.y, cell.x, tmp);
        tmp = [...result.tmp];
        arr = [...arr, ...result.voidCell];
      }
      voidCell = arr;
    }
    setClean((prev) => [...prev, ...tmp]);
  };

  const handleClick = (e, rowId, cellId) => {
    e.preventDefault();
    const cell = `${rowId}-${cellId}`;
    if (
      bomb ||
      clean.includes(cell) ||
      marked.includes(cell) ||
      isPaused ||
      end
    ) {
      return;
    }
    if (!started) {
      let start = { x: cellId, y: rowId };
      setGame(generateBombs(level, game, start));
      setStarted(true);
    }
    if (game[rowId][cellId] !== -1) {
      if (!game[rowId][cellId]) {
        checkCleanBorad(rowId, cellId, [cell]);
      } else {
        setClean((prev) => [...prev, cell]);
      }
    } else {
      setBomb(`${rowId}-${cellId}`);
    }
  };

  const handleContextMenu = (e, rowId, cellId) => {
    e.preventDefault();
    let cell = `${rowId}-${cellId}`;
    if (bomb || clean.includes(cell) || isPaused || end) {
      return;
    }
    if (marked.includes(cell)) {
      setMarked((a) => a.filter((e) => e !== cell));
      setAsked((a) => [...a, cell]);
    } else if (asked.includes(cell)) {
      setAsked((a) => a.filter((e) => e !== cell));
    } else {
      setMarked((a) => [...a, cell]);
    }
  };

  let contextValue = {
    game,
    level,
    marked,
    asked,
    clean,
    isPaused,
    bomb,
    handleClick,
    handleContextMenu,
    setMarked,
    setAsked,
  };

  return (
    <Context.Provider value={contextValue}>
      <div className="container">
        {!end ? (
          <Timer
            time={time}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            marked={marked}
            level={level}
          />
        ) : (
          <Result time={time} bomb={bomb} />
        )}
        <div className={`board${isPaused ? " tablePause" : ""}`}>
          <table
            className={`front ${bomb ? "fail" : ""}${isPaused ? " tablePause" : ""}`}
          >
            <tbody>
              {game.map((row, i) => (
                <Row index={i} key={`row-${i}`} />
              ))}
            </tbody>
          </table>
          <div className="back">PAUSE</div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default GameBoard;
