import { createReadStream } from "fs";
import { resolve } from "path";

export async function readFile(currentDirectory, filePath) {
  const fullPath = resolve(currentDirectory, filePath);
  const readStream = createReadStream(fullPath, "utf-8");

  readStream.on("data", (chunk) => {
    console.log(`File content:`);
    console.log("---------------------------------------------------------");
    console.log(chunk);
    console.log("---------------------------------------------------------");
  });

  readStream.on("error", () => {
    throw new Error("Operation failed");
  });
}
