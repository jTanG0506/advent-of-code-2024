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

const countDistinctSides = (region: Point[], grid: string[][]): number => {
  let sides = 0;

  const isValid = (row: number, col: number): boolean => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
  };

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  for (const point of region) {
    const plant = grid[point.row][point.col];

    for (let i = 0; i < 4; i++) {
      const newRow = point.row + dr[i];
      const newCol = point.col + dc[i];

      if (!isValid(newRow, newCol) || grid[newRow][newCol] !== plant) {
        // Check the cell 90 degrees counterclockwise (for edge beginning)
        const ccRow = point.row + dr[(i - 1 + 4) % 4];
        const ccCol = point.col + dc[(i - 1 + 4) % 4];
        const isBeginEdge =
          !isValid(ccRow, ccCol) || grid[ccRow][ccCol] !== plant;

        // Check for L-shaped concavity
        const cornerRow = newRow + dr[(i - 1 + 4) % 4];
        const cornerCol = newCol + dc[(i - 1 + 4) % 4];
        const isConcaveBeginEdge =
          isValid(cornerRow, cornerCol) && grid[cornerRow][cornerCol] === plant;

        if (isBeginEdge || isConcaveBeginEdge) {
          sides++;
        }
      }
    }
  }

  return sides;
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
    const sides = countDistinctSides(region, grid);
    const price = area * sides;
    ans += price;
  }

  console.log(ans);
};

main();
