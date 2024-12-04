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
      if (grid[r][c] !== "A") {
        continue;
      }

      const topLeft = grid[r - 1]?.[c - 1];
      const topRight = grid[r - 1]?.[c + 1];
      const bottomLeft = grid[r + 1]?.[c - 1];
      const bottomRight = grid[r + 1]?.[c + 1];

      if (
        (topLeft === "M" && bottomRight === "S") ||
        (topLeft === "S" && bottomRight === "M")
      ) {
        if (
          (topRight === "M" && bottomLeft === "S") ||
          (topRight === "S" && bottomLeft === "M")
        ) {
          ans += 1;
        }
      }
    }
  }

  console.log(ans);
};

main();
