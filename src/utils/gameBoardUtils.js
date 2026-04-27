export const dataGameBoard = (level) => {
  let grid = [];
  for (let i = 1; i <= level.lines; i++) {
    let line = [];
    for (let j = 1; j <= level.columns; j++) {
      line.push(null);
    }
    grid.push(line);
  }
  // for (let i = 1; i <= level.bombs; i++) {
  //   let x = Math.floor(Math.random() * (level.columns - 1) + 1);
  //   let y = Math.floor(Math.random() * (level.lines - 1) + 1);
  //   while (grid[y][x] === -1) {
  //     x = Math.floor(Math.random() * (level.columns - 1) + 1);
  //     y = Math.floor(Math.random() * (level.lines - 1) + 1);
  //   }
  //   grid[y][x] = -1;

  //   for (let j = x - 1; j <= x + 1; j++) {
  //     if (j !== -1 && j !== level.columns) {
  //       for (let k = y - 1; k <= y + 1; k++) {
  //         if (k !== -1 && k !== level.lines && grid[k][j] !== -1) {
  //           grid[k][j]++;
  //         }
  //       }
  //     }
  //   }
  // }

  return grid;
};

export const generateBombs = (level, grid, start) => {
  // Generate safe zone around starting position (3x3 grid)
  const temp = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      temp.push({ x: start.x + dx, y: start.y + dy });
    }
  }
  for (let i = 1; i <= level.bombs; i++) {
    let x = Math.floor(Math.random() * (level.columns - 1) + 1);
    let y = Math.floor(Math.random() * (level.lines - 1) + 1);
    while (
      grid[y][x] === -1 ||
      temp.find((cell) => cell.x === x && cell.y === y)
    ) {
      x = Math.floor(Math.random() * (level.columns - 1) + 1);
      y = Math.floor(Math.random() * (level.lines - 1) + 1);
    }
    grid[y][x] = -1;

    for (let j = x - 1; j <= x + 1; j++) {
      if (j !== -1 && j !== level.columns) {
        for (let k = y - 1; k <= y + 1; k++) {
          if (k !== -1 && k !== level.lines && grid[k][j] !== -1) {
            grid[k][j]++;
          }
        }
      }
    }
  }

  return grid;
};
