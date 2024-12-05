import * as fs from "fs";
import path from "path";

const isCorrectOrder = (update: number[], graph: Map<number, Set<number>>) => {
  for (let j = update.length - 1; j >= 0; --j) {
    const page = update[j];
    for (let k = j - 1; k >= 0; --k) {
      const otherPage = update[k];
      if (graph.has(page) && graph.get(page)?.has(otherPage)) {
        return false;
      }
    }
  }

  return true;
};

// Assumes no cycle, as per the problem statement
const topologicalSort = (
  pages: number[],
  graph: Map<number, Set<number>>
): number[] => {
  const subgraph = new Map<number, Set<number>>();
  const inDegree = new Map<number, number>();

  for (let i = 0; i < pages.length; ++i) {
    inDegree.set(pages[i], 0);
    subgraph.set(pages[i], new Set());
  }

  // Edges + In-Degree counts
  for (let i = 0; i < pages.length; ++i) {
    const page = pages[i];
    const successors = graph.get(page);
    if (!successors) {
      continue;
    }

    for (const neighbor of successors) {
      if (!subgraph.has(neighbor)) {
        continue;
      }

      if (!subgraph.get(page)!.has(neighbor)) {
        subgraph.get(page)!.add(neighbor);
        inDegree.set(neighbor, (inDegree.get(neighbor) ?? 0) + 1);
      }
    }
  }

  const queue: number[] = [];
  for (const [page, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(page);
    }
  }

  const sortedPages: number[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    sortedPages.push(node);
    const neighbors = subgraph.get(node);
    if (neighbors) {
      for (const neighbor of neighbors) {
        inDegree.set(neighbor, (inDegree.get(neighbor) ?? 0) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }
  }

  return sortedPages;
};

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
    let u = updates[i];
    const isValid = isCorrectOrder(u, pagesAfter);
    if (isValid) {
      continue;
    }

    u = topologicalSort(u, pagesAfter);
    ans += u[Math.floor(u.length / 2)];
  }

  console.log(ans);
};

main();
