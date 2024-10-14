import { createReadStream, createWriteStream } from "fs";
import { resolve, basename } from "path";

export async function copyFile(currentDirectory, src, dest) {
  const srcPath = resolve(currentDirectory, src);
  const destPath = resolve(currentDirectory, dest, basename(src));

  const readStream = createReadStream(srcPath);
  const writeStream = createWriteStream(destPath);

  readStream.pipe(writeStream);

  readStream.on("error", () => {
    throw new Error("Operation failed");
  });
}
