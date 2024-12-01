import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-1/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const values = line.split(/\s+/);

    left.push(Number(values[0]));
    right.push(Number(values[1]));
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let ans = 0;
  for (let i = 0; i < left.length; ++i) {
    ans += Math.abs(left[i] - right[i]);
  }

  console.log(ans);
};

main();
