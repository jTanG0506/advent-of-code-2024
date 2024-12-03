import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-3/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ans = 0;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const matches = line.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
    if (!matches?.length) {
      continue;
    }

    for (let j = 0; j < matches.length; ++j) {
      const match = matches[j];
      const values = match.match(/mul\((\d{1,3}),(\d{1,3})\)/);
      if (values) {
        ans += Number(values[1]) * Number(values[2]);
      }
    }
  }

  console.log(ans);
};

main();
