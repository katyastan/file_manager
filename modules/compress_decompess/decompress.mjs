import { createReadStream, createWriteStream, access } from "fs";
import { pipeline } from "stream";
import { join } from "path";
import { constants } from "fs";
import { promisify } from "util";
import { createBrotliDecompress } from "zlib";

const accessAsync = promisify(access);
const pipe = promisify(pipeline);

export async function decompressFile(directory, source, destination) {
  try {
    const sourcePath = source.startsWith("/") ? source : join(directory, source);
    const destinationPath = destination.startsWith("/") ? destination : join(directory, destination);
    await accessAsync(sourcePath, constants.R_OK);
    const brotliDecompress = createBrotliDecompress();
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    await pipe(sourceStream, brotliDecompress, destinationStream);
    console.log(`File successfully decompressed to: ${destinationPath}`);
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
  }
}
