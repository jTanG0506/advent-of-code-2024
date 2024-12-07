import * as fs from "fs";
import path from "path";

const canReachTarget = (
  numbers: number[],
  target: number,
  currentIndex: number,
  currentValue: number
): boolean => {
  if (currentValue > target) {
    return false;
  }

  if (currentIndex === numbers.length) {
    return currentValue === target;
  }

  const num = numbers[currentIndex];

  if (canReachTarget(numbers, target, currentIndex + 1, currentValue + num)) {
    return true;
  }

  if (canReachTarget(numbers, target, currentIndex + 1, currentValue * num)) {
    return true;
  }

  return false;
};

const main = () => {
  const filePath = path.join(process.cwd(), "day-7/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");

  const rows: { target: number; numbers: number[] }[] = [];
  for (const line of lines) {
    const [left, right] = line.split(": ");
    const rightNumbers = right.split(" ").map(Number);
    rows.push({ target: Number(left), numbers: rightNumbers });
  }

  let ans = 0;
  for (let i = 0; i < rows.length; ++i) {
    const row = rows[i];
    if (canReachTarget(row.numbers.slice(1), row.target, 0, row.numbers[0])) {
      ans += row.target;
    }
  }

  console.log(ans);
};

main();
