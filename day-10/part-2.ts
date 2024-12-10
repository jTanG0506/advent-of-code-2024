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

  const countUniquePaths = (startX: number, startY: number): number => {
    const paths = new Map<string, Set<string>>();
    const queue: [number, number, number, string][] = [
      [startX, startY, 0, `${startX},${startY}`],
    ];

    while (queue.length > 0) {
      const [x, y, val, path] = queue.shift()!;
      const key = `${x},${y}`;

      if (grid[x][y] === 9) {
        if (!paths.has(key)) {
          paths.set(key, new Set());
        }
        paths.get(key)!.add(path);
        continue;
      }

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (isValid(newX, newY) && grid[newX][newY] === val + 1) {
          queue.push([newX, newY, val + 1, `${path};${newX},${newY}`]);
        }
      }
    }

    let totalPaths = 0;
    for (const pathSet of paths.values()) {
      totalPaths += pathSet.size;
    }

    return totalPaths;
  };

  let ans = 0;
  for (let i = 0; i < zeros.length; ++i) {
    const [x, y] = zeros[i];
    ans += countUniquePaths(x, y);
  }

  console.log(ans);
};

main();
