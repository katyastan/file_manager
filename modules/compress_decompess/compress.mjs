import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { createBrotliCompress } from "zlib";

const pipe = promisify(pipeline);

export async function compressFile(source, destination) {
  try {
    const brotliCompress = createBrotliCompress();
    const sourceStream = createReadStream(source);
    const destinationStream = createWriteStream(destination);
    await pipe(sourceStream, brotliCompress, destinationStream);
    console.log(`File successfully compressed to: ${destination}`);
  } catch (err) {
    console.error("Operation failed");
  }
}
