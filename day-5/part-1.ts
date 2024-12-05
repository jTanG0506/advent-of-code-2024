import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-5/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  let hasReadSeparator = false;
  const pagesAfter = new Map<number, Set<number>>();
  const updates: number[][] = [];
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i] === "") {
      hasReadSeparator = true;
      continue;
    }

    if (hasReadSeparator) {
      updates.push(lines[i].split(",").map(Number));
      continue;
    }

    const [a, b] = lines[i].split("|").map(Number);
    if (!pagesAfter.has(a)) {
      pagesAfter.set(a, new Set());
    }

    pagesAfter.get(a)?.add(b);
  }

  let ans = 0;
  for (let i = 0; i < updates.length; ++i) {
    const u = updates[i];
    let isInvalid = false;
    for (let j = u.length - 1; j >= 0; --j) {
      const page = u[j];
      for (let k = j - 1; k >= 0; --k) {
        const otherPage = u[k];
        if (pagesAfter.has(page) && pagesAfter.get(page)?.has(otherPage)) {
          isInvalid = true;
          break;
        }
      }

      if (isInvalid) {
        break;
      }
    }

    if (isInvalid) {
      continue;
    }

    ans += u[Math.floor(u.length / 2)];
  }

  console.log(ans);
};

main();
