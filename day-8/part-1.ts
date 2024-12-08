import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-8/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const grid: string[][] = [];
  const antennas: { [key: string]: [number, number][] } = {};
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    const row: string[] = [];
    for (let j = 0; j < line.length; ++j) {
      const c = line[j];
      row.push(c);
      if (c === ".") {
        continue;
      }

      if (!antennas[c]) {
        antennas[c] = [];
      }
      antennas[c].push([i, j]);
    }

    grid.push(row);
  }

  const antinodes: boolean[][] = new Array(grid.length)
    .fill(false)
    .map(() => new Array(grid[0].length).fill(false));

  const R = grid.length;
  const C = grid[0].length;

  for (const antenna of Object.values(antennas)) {
    for (let i = 0; i < antenna.length; ++i) {
      const _left = antenna[i];
      for (let j = i + 1; j < antenna.length; ++j) {
        const _right = antenna[j];

        const [left, right] =
          _left[0] < _right[0] ? [_left, _right] : [_right, _left];

        const diff = [right[0] - left[0], right[1] - left[1]];

        const l = [left[0] - diff[0], left[1] - diff[1]];
        const r = [right[0] + diff[0], right[1] + diff[1]];

        if (l[0] >= 0 && l[0] < R && l[1] >= 0 && l[1] < C) {
          antinodes[l[0]][l[1]] = true;
        }

        if (r[0] >= 0 && r[0] < R && r[1] >= 0 && r[1] < C) {
          antinodes[r[0]][r[1]] = true;
        }
      }
    }
  }

  let ans = 0;
  for (let i = 0; i < antinodes.length; ++i) {
    for (let j = 0; j < antinodes[i].length; ++j) {
      if (antinodes[i][j]) {
        ans += 1;
      }
    }
  }

  console.log(ans);
};

main();
