import * as fs from "fs";
import path from "path";

const isValidSequence = (items: number[], skipIndex: number = -1): boolean => {
  if (items.length < 2) return true;

  let prev = -1;
  let first = true;
  let dir = 0;

  for (let i = 0; i < items.length; i++) {
    if (i === skipIndex) continue;

    if (first) {
      prev = items[i];
      first = false;
      continue;
    }

    const diff = items[i] - prev;
    if (dir === 0) {
      dir = diff > 0 ? 1 : -1;
    }

    const v = diff * dir;
    if (v < 1 || v > 3) {
      return false;
    }

    prev = items[i];
  }

  return true;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-2/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let ans = 0;
  for (let i = 0; i < lines.length; ++i) {
    const items = lines[i].split(/\s+/).map(Number);

    if (isValidSequence(items)) {
      ans += 1;
      continue;
    }

    for (let j = 0; j < items.length; ++j) {
      if (isValidSequence(items, j)) {
        ans += 1;
        break;
      }
    }
  }

  console.log(ans);
};

main();
