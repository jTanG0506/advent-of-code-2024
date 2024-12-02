import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-2/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ans = 0;
  for (let i = 0; i < lines.length; ++i) {
    const items = lines[i].split(/\s+/).map(Number);
    const dir = items[0] < items[1] ? 1 : -1;

    let valid = true;
    for (let j = 0; j < items.length - 1; ++j) {
      const diff = items[j + 1] - items[j];
      const v = diff * dir;

      if (v < 1 || v > 3) {
        valid = false;
        break;
      }
    }

    if (valid) {
      ans += 1;
    }
  }

  console.log(ans);
};

main();
