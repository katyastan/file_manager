import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

const pipe = promisify(pipeline);

export async function compressFile(source, destination) {
  const brotliCompress = createBrotliCompress();
  const sourceStream = createReadStream(source);
  const destinationStream = createWriteStream(destination);
  await pipe(sourceStream, brotliCompress, destinationStream);
  console.log(`File successfully compressed to: ${destination}`);
}

export async function decompressFile(source, destination) {
  const brotliDecompress = createBrotliDecompress();
  const sourceStream = createReadStream(source);
  const destinationStream = createWriteStream(destination);
  await pipe(sourceStream, brotliDecompress, destinationStream);
  console.log(`File successfully decompressed to: ${destination}`);
}
