import * as fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.join(process.cwd(), "day-9/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const input = data.trim();

  const blocks: number[] = [];
  let fileId = 0;

  for (let i = 0; i < input.length; i += 2) {
    const fileLength = parseInt(input[i]);
    for (let j = 0; j < fileLength; j++) {
      blocks.push(fileId);
    }
    fileId++;

    if (i + 1 < input.length) {
      const spaceLength = parseInt(input[i + 1]);
      for (let j = 0; j < spaceLength; j++) {
        blocks.push(-1);
      }
    }
  }

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] === -1 || blocks[i] === undefined) {
      continue;
    }

    let spacePos = 0;
    while (spacePos < i && blocks[spacePos] !== -1) {
      spacePos++;
    }

    if (spacePos < i && blocks[spacePos] === -1) {
      blocks[spacePos] = blocks[i];
      blocks[i] = -1;
    }
  }

  let ans = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== -1) {
      ans += i * blocks[i];
    }
  }

  console.log(ans);
};

main();
