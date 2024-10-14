import { createReadStream, createWriteStream } from "fs";
import { resolve, basename } from "path";

export async function copyFile(currentDirectory, src, dest) {
  const srcPath = resolve(currentDirectory, src);
  const destPath = resolve(currentDirectory, dest, basename(src));

  const readStream = createReadStream(srcPath);
  const writeStream = createWriteStream(destPath);

  readStream.on('error', (err) => {
    console.error("Operation failed: Source file not found.");
  });

  writeStream.on('error', (err) => {
    console.error("Operation failed: Destination path error.");
  });

  readStream.pipe(writeStream);
}
