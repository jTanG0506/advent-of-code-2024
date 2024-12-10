import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-10/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const input = data.trim();
  const rows = input.split("\n");
  const grid: number[][] = [];
  const zeros: number[][] = [];

  for (let i = 0; i < rows.length; ++i) {
    const row = rows[i].split("");
    grid.push([]);

    for (let j = 0; j < row.length; ++j) {
      if (row[j] === "0") {
        zeros.push([i, j]);
      }

      grid[i].push(parseInt(row[j]));
    }
  }

  const isValid = (x: number, y: number): boolean => {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
  };

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const countPaths = (startX: number, startY: number): number => {
    const queue: [number, number, number][] = [[startX, startY, 0]];
    const visited = new Set<string>();
    const validPaths = new Set<string>();

    while (queue.length > 0) {
      const [x, y, val] = queue.shift()!;
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      visited.add(key);

      if (grid[x][y] === 9) {
        validPaths.add(key);
        continue;
      }

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          isValid(newX, newY) &&
          grid[newX][newY] === val + 1 &&
          !visited.has(`${newX},${newY}`)
        ) {
          queue.push([newX, newY, val + 1]);
        }
      }
    }

    return validPaths.size;
  };

  let ans = 0;
  for (let i = 0; i < zeros.length; ++i) {
    const [x, y] = zeros[i];
    ans += countPaths(x, y);
  }

  console.log(ans);
};

main();
