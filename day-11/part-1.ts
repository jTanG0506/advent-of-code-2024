import * as fs from "fs";
import path from "path";

const getDigits = (n: number): number[] => {
  if (n === 0) {
    return [0];
  }
  const digits: number[] = [];
  while (n > 0) {
    digits.unshift(n % 10);
    n = Math.floor(n / 10);
  }
  return digits;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-11/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const input = data.trim();
  const rows = input.split("\n");
  let stones = rows[0].split(" ").map((stone) => parseInt(stone));

  for (let i = 0; i < 25; ++i) {
    let next: number[] = [];
    for (let j = 0; j < stones.length; ++j) {
      const s = stones[j];
      if (s === 0) {
        next.push(1);
        continue;
      }

      const digits = getDigits(s);
      if (digits.length % 2 === 0) {
        const left = parseInt(digits.slice(0, digits.length / 2).join(""));
        const right = parseInt(digits.slice(digits.length / 2).join(""));
        next.push(left, right);
        continue;
      }

      next.push(s * 2024);
    }
    stones = next;
  }

  const ans = stones.length;
  console.log(ans);
};

main();
