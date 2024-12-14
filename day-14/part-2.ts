import * as fs from "fs";
import path from "path";
import { createCanvas } from "canvas";

const mod = (n: number, m: number): number => {
  return ((n % m) + m) % m;
};

const WIDTH = 101;
const HEIGHT = 103;

const main = () => {
  const filePath = path.join(process.cwd(), "day-14/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const points: { x: number; y: number; vx: number; vy: number }[] = [];
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const matches = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/);
    if (!matches) {
      continue;
    }

    const [_, px, py, vx, vy] = matches;
    points.push({
      x: Number(px),
      y: Number(py),
      vx: Number(vx),
      vy: Number(vy),
    });
  }

  for (let i = 0; i < 6771; ++i) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let j = 0; j < points.length; ++j) {
      const { x, y, vx, vy } = points[j];
      const newX = mod(x + vx, WIDTH);
      const newY = mod(y + vy, HEIGHT);

      points[j] = {
        x: newX,
        y: newY,
        vx,
        vy,
      };

      ctx.fillStyle = "black";
      ctx.fillRect(newX, newY, 1, 1);
    }

    const outPath = path.join(process.cwd(), `day-14/images/out-${i + 1}.png`);
    const out = fs.createWriteStream(outPath);
    canvas.createPNGStream().pipe(out);
  }
};

main();
