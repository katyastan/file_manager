import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { createBrotliDecompress } from "zlib";

const pipe = promisify(pipeline);

export async function decompressFile(source, destination) {
  const brotliDecompress = createBrotliDecompress();
  const sourceStream = createReadStream(source);
  const destinationStream = createWriteStream(destination);
  await pipe(sourceStream, brotliDecompress, destinationStream);
  console.log(`File successfully decompressed to: ${destination}`);
}
