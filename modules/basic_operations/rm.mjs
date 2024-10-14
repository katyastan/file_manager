import { unlink } from "fs/promises";
import { join } from "path";

export async function deleteFile(currentDirectory, filePath) {
  const fullPath = filePath.startsWith("/")
    ? filePath
    : join(currentDirectory, filePath);
  await unlink(fullPath);
}
