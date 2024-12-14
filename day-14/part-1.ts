import * as fs from "fs";
import path from "path";

const mod = (n: number, m: number): number => {
  return ((n % m) + m) % m;
};

const getQuadrant = (
  x: number,
  y: number,
  width: number,
  height: number
): number | null => {
  const xMid = Math.floor(width / 2);
  const yMid = Math.floor(height / 2);

  if (x === xMid || y === yMid) {
    return null;
  }

  if (x > xMid && y < yMid) {
    return 0;
  }

  if (x < xMid && y < yMid) {
    return 1;
  }

  if (x < xMid && y > yMid) {
    return 2;
  }

  return 3;
};

const WIDTH = 101;
const HEIGHT = 103;
const ITERATIONS = 100;

const main = () => {
  const filePath = path.join(process.cwd(), "day-14/sample.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").filter(line => line.trim() !== "");

  const quadrantCounts = [0, 0, 0, 0];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matches = line.match(/p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/);
    if (!matches) {
      continue;
    }

    const [_, px, py, vx, vy] = matches;
    const x = mod(Number(px) + ITERATIONS * Number(vx), WIDTH);
    const y = mod(Number(py) + ITERATIONS * Number(vy), HEIGHT);
    const quadrant = getQuadrant(x, y, WIDTH, HEIGHT);
    if (quadrant !== null) {
      quadrantCounts[quadrant]++;
    }
  }

  console.log("Quadrant counts:", quadrantCounts);
  let ans = 1;
  for (let i = 0; i < 4; ++i) {
    ans *= quadrantCounts[i];
  }
  console.log("Answer:", ans);
};

main();
