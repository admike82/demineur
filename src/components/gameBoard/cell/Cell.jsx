import { useContext } from "react";
import flag from "@assets/flag.svg";
import mine from "@assets/mine.svg";
import "./cell.css";
import Context from "../../../contexts/Context";

const Cell = ({ rowIndex, index }) => {
  const {
    game,
    marked,
    asked,
    clean,
    isPaused,
    bomb,
    handleClick,
    handleContextMenu,
    setMarked,
    setAsked,
  } = useContext(Context);
  const rowId = parseInt(rowIndex);
  const cellId = parseInt(index);
  let className = "";

  let value = "";

  if (clean.includes(`${rowId}-${cellId}`)) {
    className += "clean ";
    value = game[rowId][cellId];
    switch (value) {
      case 1:
        className += "blue";
        break;
      case 2:
        className += "green";
        break;
      case 3:
        className += "red";
        break;
      case 4:
        className += "darkBlue";
        break;
      case 5:
        className += "darkRed";
        break;
      case 6:
        className += "marine";
        break;
      case 7:
        className += "black";
        break;
      case 8:
        className += "grey";
        break;
      default:
        null;
        break;
    }
  }

  if (marked.includes(`${rowId}-${cellId}`)) {
    if (!clean.includes(`${rowId}-${cellId}`)) {
      className += "marked ";
      value = <img src={flag} alt="flag" className="img" />;
    } else {
      setMarked((p) => p.filter((x) => x !== `${rowId}-${cellId}`));
    }
  }

  if (asked.includes(`${rowId}-${cellId}`)) {
    if (!clean.includes(`${rowId}-${cellId}`)) {
      value = "?";
    } else {
      setAsked((p) => p.filter((x) => x !== `${rowId}-${cellId}`));
    }
  }

  if (bomb && game[rowId][cellId] === -1) {
    className += "fail ";
    value = <img src={mine} alt="flag" className="img" />;
  }

  if (!bomb && !clean.includes(`${rowId}-${cellId}`) && !isPaused) {
    className += "pointer ";
  }

  return (
    <td
      className={className}
      onClick={(e) => handleClick(e, rowId, cellId)}
      onContextMenu={(e) => handleContextMenu(e, rowId, cellId)}
      role="gridcell"
    >
      {value}
    </td>
  );
};

export default Cell;
