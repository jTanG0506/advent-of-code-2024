import * as fs from "fs";
import path from "path";

type Point = {
  row: number;
  col: number;
};

const findRegions = (grid: string[][]): Point[][] => {
  const visited = new Set<string>();
  const regions: Point[][] = [];

  const isValid = (row: number, col: number): boolean => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
  };

  const getKey = (row: number, col: number): string => {
    return `${row},${col}`;
  };

  const dfs = (row: number, col: number, char: string): Point[] => {
    const region: Point[] = [];
    const stack: Point[] = [{ row, col }];

    while (stack.length > 0) {
      const current = stack.pop()!;
      const key = getKey(current.row, current.col);

      if (visited.has(key)) {
        continue;
      }

      if (!isValid(current.row, current.col)) {
        continue;
      }

      if (grid[current.row][current.col] !== char) {
        continue;
      }

      visited.add(key);
      region.push(current);

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dr, dc] of directions) {
        stack.push({ row: current.row + dr, col: current.col + dc });
      }
    }

    return region;
  };

  for (let r = 0; r < grid.length; ++r) {
    for (let c = 0; c < grid[0].length; ++c) {
      const key = getKey(r, c);
      if (visited.has(key)) {
        continue;
      }

      const region = dfs(r, c, grid[r][c]);
      if (region.length > 0) {
        regions.push(region);
      }
    }
  }

  return regions;
};

const calculatePerimeter = (region: Point[]): number => {
  let perimeter = 0;
  const regionSet = new Set(region.map((p) => `${p.row},${p.col}`));

  for (const point of region) {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const [dr, dc] of directions) {
      const newRow = point.row + dr;
      const newCol = point.col + dc;

      if (!regionSet.has(`${newRow},${newCol}`)) {
        perimeter++;
      }
    }
  }

  return perimeter;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-12/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  const grid = lines.map((line) => line.split(""));

  const regions = findRegions(grid);

  let ans = 0;
  for (let i = 0; i < regions.length; ++i) {
    const region = regions[i];
    const area = region.length;
    const perimeter = calculatePerimeter(region);
    const price = area * perimeter;
    ans += price;
  }

  console.log(ans);
};

main();
