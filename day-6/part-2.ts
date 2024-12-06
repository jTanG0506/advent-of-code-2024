import * as fs from "fs";
import path from "path";

interface Position {
  x: number;
  y: number;
  direction: number;
}

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const isInBounds = (pos: [number, number], grid: string[][]): boolean => {
  return (
    pos[0] >= 0 &&
    pos[0] < grid.length &&
    pos[1] >= 0 &&
    pos[1] < grid[pos[0]].length
  );
};

const detectLoop = (startPos: Position, grid: string[][]): boolean => {
  const visited = Array(grid.length)
    .fill(null)
    .map(() =>
      Array(grid[0].length)
        .fill(null)
        .map(() => Array(4).fill(false))
    );

  let current = { ...startPos };

  while (true) {
    if (visited[current.x][current.y][current.direction]) {
      return true;
    }

    visited[current.x][current.y][current.direction] = true;

    const nextX = current.x + DIRECTIONS[current.direction][0];
    const nextY = current.y + DIRECTIONS[current.direction][1];

    if (!isInBounds([nextX, nextY], grid)) {
      return false;
    }

    if (grid[nextX][nextY] === "#") {
      current.direction = (current.direction + 1) % 4;
    } else {
      current.x = nextX;
      current.y = nextY;
    }
  }
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-6/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const grid = data.split("\n").map((line) => line.split(""));

  let startPos: Position | null = null;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") {
        startPos = { x: i, y: j, direction: 0 };
        grid[i][j] = ".";
        break;
      }
    }
    if (startPos) {
      break;
    }
  }

  if (!startPos) {
    return;
  }

  const originalPath = new Set<string>();
  let current: Position = { ...startPos };

  while (true) {
    originalPath.add(`${current.x},${current.y}`);
    const nextX = current.x + DIRECTIONS[current.direction][0];
    const nextY = current.y + DIRECTIONS[current.direction][1];

    if (!isInBounds([nextX, nextY], grid)) {
      break;
    }

    if (grid[nextX][nextY] === "#") {
      current.direction = (current.direction + 1) % 4;
    } else {
      current.x = nextX;
      current.y = nextY;
    }
  }

  let ans = 0;
  originalPath.forEach((pos) => {
    const [x, y] = pos.split(",").map(Number);

    if (x === startPos!.x && y === startPos!.y) {
      return;
    }

    if (grid[x][y] === ".") {
      grid[x][y] = "#";
      if (detectLoop(startPos!, grid)) {
        ans++;
      }
      grid[x][y] = ".";
    }
  });

  console.log(ans);
};

main();
