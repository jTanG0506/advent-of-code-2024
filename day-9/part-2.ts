import * as fs from "fs";
import path from "path";

interface File {
  id: number;
  size: number;
  startPos: number;
}

const main = () => {
  const filePath = path.join(process.cwd(), "day-9/input.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const input = data.trim();

  const files: File[] = [];
  let pos = 0;

  for (let i = 0; i < input.length; i += 2) {
    const size = parseInt(input[i]);
    files.push({ id: Math.floor(i / 2), size, startPos: pos });
    pos += size;
    if (i + 1 < input.length) {
      pos += parseInt(input[i + 1]);
    }
  }

  const blocks = new Array(pos).fill(-1);

  for (const file of files) {
    for (let i = 0; i < file.size; i++) {
      blocks[file.startPos + i] = file.id;
    }
  }

  for (let fileId = files.length - 1; fileId >= 0; fileId--) {
    const file = files[fileId];

    let currentPos = 0;
    while (blocks[currentPos] !== fileId) {
      currentPos++;
    }

    let targetPos = 0;
    while (targetPos < currentPos) {
      let hasSpace = true;
      for (let i = 0; i < file.size; i++) {
        if (blocks[targetPos + i] !== -1) {
          hasSpace = false;
          targetPos = targetPos + i + 1;
          break;
        }
      }

      if (hasSpace) {
        for (let i = 0; i < file.size; i++) {
          blocks[targetPos + i] = fileId;
          blocks[currentPos + i] = -1;
        }
        break;
      }
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
