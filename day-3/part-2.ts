import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-3/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ans = 0;
  let disabled = false;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const matches = line.match(/mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g);
    if (!matches?.length) {
      continue;
    }

    for (let j = 0; j < matches.length; ++j) {
      const match = matches[j];
      if (match === "don't()") {
        disabled = true;
        continue;
      }
      if (match === "do()") {
        disabled = false;
        continue;
      }

      if (disabled) {
        continue;
      }

      const values = match.match(/mul\((\d{1,3}),(\d{1,3})\)/);
      if (values) {
        ans += Number(values[1]) * Number(values[2]);
      }
    }
  }

  console.log(ans);
};

main();
