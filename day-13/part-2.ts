import * as fs from "fs";
import path from "path";

const parseButtonLine = (input: string, letter: string) => {
  const matches = input.match(`Button ${letter}: X\\+([0-9]+), Y\\+([0-9]+)`);
  if (!matches) {
    return null;
  }

  const [_, x, y] = matches;
  return { x: Number(x), y: Number(y) };
};

const parsePrizeLine = (input: string) => {
  const matches = input.match(`Prize: X=([0-9]+), Y=([0-9]+)`);
  if (!matches) {
    return null;
  }

  const [_, x, y] = matches;
  return { x: 10000000000000 + Number(x), y: 10000000000000 + Number(y) };
};

const isValidSolution = (x: number, y: number): boolean => {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-13/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").filter((line) => line.length > 0);

  let ans = 0n;
  for (let i = 0; i < lines.length; i += 3) {
    const buttonA = parseButtonLine(lines[i], "A");
    const buttonB = parseButtonLine(lines[i + 1], "B");
    const prize = parsePrizeLine(lines[i + 2]);

    if (!buttonA || !buttonB || !prize) {
      continue;
    }

    // ax + by = e (X axis equation)
    // cx + dy = f (Y axis equation)
    const a = buttonA.x;
    const b = buttonB.x;
    const c = buttonA.y;
    const d = buttonB.y;
    const e = prize.x;
    const f = prize.y;

    const determinant = a * d - b * c;
    if (determinant === 0) {
      continue;
    }

    const x = (e * d - b * f) / determinant;
    const y = (a * f - e * c) / determinant;

    if (isValidSolution(x, y)) {
      ans += 3n * BigInt(x) + BigInt(y);
    }
  }

  console.log(ans);
};

main();
