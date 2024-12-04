import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-4/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const grid: string[][] = [];
  for (let i = 0; i < lines.length; ++i) {
    grid.push(lines[i].split(""));
  }

  let ans = 0;
  for (let r = 0; r < grid.length; ++r) {
    for (let c = 0; c < grid[r].length; ++c) {
      if (grid[r][c] !== "X") {
        continue;
      }

      // Left to Right
      if (
        grid[r]?.[c + 1] === "M" &&
        grid[r]?.[c + 2] === "A" &&
        grid[r]?.[c + 3] === "S"
      ) {
        ans += 1;
      }

      // Right to Left
      if (
        grid[r]?.[c - 1] === "M" &&
        grid[r]?.[c - 2] === "A" &&
        grid[r]?.[c - 3] === "S"
      ) {
        ans += 1;
      }

      // Top Left to Bottom Right
      if (
        grid[r + 1]?.[c + 1] === "M" &&
        grid[r + 2]?.[c + 2] === "A" &&
        grid[r + 3]?.[c + 3] === "S"
      ) {
        ans += 1;
      }

      // Top Right to Bottom Left
      if (
        grid[r + 1]?.[c - 1] === "M" &&
        grid[r + 2]?.[c - 2] === "A" &&
        grid[r + 3]?.[c - 3] === "S"
      ) {
        ans += 1;
      }

      // Top to Bottom
      if (
        grid[r + 1]?.[c] === "M" &&
        grid[r + 2]?.[c] === "A" &&
        grid[r + 3]?.[c] === "S"
      ) {
        ans += 1;
      }

      // Bottom to Top
      if (
        grid[r - 1]?.[c] === "M" &&
        grid[r - 2]?.[c] === "A" &&
        grid[r - 3]?.[c] === "S"
      ) {
        ans += 1;
      }

      // Bottom Left to Top Right
      if (
        grid[r - 1]?.[c + 1] === "M" &&
        grid[r - 2]?.[c + 2] === "A" &&
        grid[r - 3]?.[c + 3] === "S"
      ) {
        ans += 1;
      }

      // Bottom Right to Top Left
      if (
        grid[r - 1]?.[c - 1] === "M" &&
        grid[r - 2]?.[c - 2] === "A" &&
        grid[r - 3]?.[c - 3] === "S"
      ) {
        ans += 1;
      }
    }
  }

  console.log(ans);
};

main();
