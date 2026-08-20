import React from "react";

export default React.createContext({
  game: [],
  level: { name: '', lines: 9, columns: 9, bombs: 10 },
  marked: [],
  asked: [],
  clean: [],
  isPaused: false,
  bomb: null,
  handleClick: () => {},
  handleContextMenu: () => {},
  setMarked: (marked) => { console.log('setMarked', marked); },
  setAsked: (asked) => { console.log('setAsked', asked); },
});
