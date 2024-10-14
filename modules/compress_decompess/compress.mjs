import { createReadStream, createWriteStream, access } from "fs";
import { constants } from "fs";
import { join } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { createBrotliCompress } from "zlib";

const accessAsync = promisify(access);
const pipe = promisify(pipeline);

export async function compressFile(directory, source, destination) {
  try {
    const sourcePath = source.startsWith("/") ? source : join(directory, source);
    const destinationPath = destination.startsWith("/") ? destination : join(directory, destination);
    await accessAsync(sourcePath, constants.R_OK);
    const brotliCompress = createBrotliCompress();
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    await pipe(sourceStream, brotliCompress, destinationStream);
    console.log(`File successfully compressed to: ${destinationPath}`);
  } catch (err) {
    console.error(`Operation failed: ${err.message}`);
  }
}
