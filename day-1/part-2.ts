import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-1/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const left: number[] = [];
  const right: Map<number, number> = new Map();
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const values = line.split(/\s+/);

    left.push(Number(values[0]));
    right.set(Number(values[1]), (right.get(Number(values[1])) || 0) + 1);
  }

  left.sort((a, b) => a - b);

  let ans = 0;
  for (let i = 0; i < left.length; ++i) {
    ans += left[i] * (right.get(left[i]) || 0);
  }

  console.log(ans);
};

main();
