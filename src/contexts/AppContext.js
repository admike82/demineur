import { createContext } from "react";

export default createContext({
  scores: [],
  setScores: (scores) => { console.log('setScores', scores); },
  level: null,
  setLevel: (level) => { console.log('setLevel', level); },
  resetKey: 0,
  setResetKey: (resetKey) => { console.log('setResetKey', resetKey); },
});
