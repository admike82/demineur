import { createContext } from "react";

export default createContext({
  scores: {},
  setScores: () => {},
  level: {},
  setLevel: () => {},
  resetKey: 0,
  setResetKey: () => {},
});
