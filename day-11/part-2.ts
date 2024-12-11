import * as fs from "fs";
import path from "path";

// Cache to store previously calculated transformations
const transformCache = new Map<number, number[]>();

const transformNumber = (num: number): number[] => {
  if (transformCache.has(num)) {
    return transformCache.get(num)!;
  }

  let result: number[];

  if (num === 0) {
    result = [1];
  } else {
    const n = num.toString();
    if (n.length % 2 === 0) {
      const mid = Math.floor(n.length / 2);
      const left = parseInt(n.slice(0, mid));
      const right = parseInt(n.slice(mid));
      result = [left, right];
    } else {
      result = [num * 2024];
    }
  }

  transformCache.set(num, result);
  return result;
};

const simulateBlink = (
  stoneCounts: Map<number, bigint>
): Map<number, bigint> => {
  const newStoneCounts = new Map<number, bigint>();

  for (const [stone, count] of stoneCounts.entries()) {
    const transformed = transformNumber(stone);
    for (const newStone of transformed) {
      const existing = newStoneCounts.get(newStone) || BigInt(0);
      newStoneCounts.set(newStone, existing + count);
    }
  }

  return newStoneCounts;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-11/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const input = data.trim();
  const rows = input.split("\n");

  let stoneCounts = new Map<number, bigint>();
  const initialStones = rows[0].split(" ").map((stone) => parseInt(stone));
  for (const stone of initialStones) {
    const count = stoneCounts.get(stone) || BigInt(0);
    stoneCounts.set(stone, count + BigInt(1));
  }

  for (let i = 0; i < 75; ++i) {
    stoneCounts = simulateBlink(stoneCounts);
  }

  const ans = Array.from(stoneCounts.values()).reduce(
    (sum, count) => sum + count,
    BigInt(0)
  );
  console.log(ans.toString());
};

main();
