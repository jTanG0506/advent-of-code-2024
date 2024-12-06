import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-6/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  const grid = lines.map((line) => line.split(""));

  let direction: [number, number] = [-1, 0];
  let position: [number, number] = [0, 0];
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      if (grid[i][j] === "^") {
        position = [i, j];
        grid[i][j] = "X";
        break;
      }
    }
  }

  let ans = 1;
  while (
    position[0] >= 0 &&
    position[0] < grid.length &&
    position[1] >= 0 &&
    position[1] < grid[position[0]].length
  ) {
    const next = grid[position[0] + direction[0]]?.[position[1] + direction[1]];
    if (next === "#") {
      if (direction[0] === -1) {
        direction = [0, 1];
      } else if (direction[0] === 1) {
        direction = [0, -1];
      } else if (direction[1] === -1) {
        direction = [-1, 0];
      } else {
        direction = [1, 0];
      }

      continue;
    }

    position = [position[0] + direction[0], position[1] + direction[1]];
    if (grid[position[0]]?.[position[1]] === ".") {
      grid[position[0]][position[1]] = "X";
      ans++;
    }
  }

  console.log(ans);
};

main();
