import { rename } from "fs/promises";
import { join } from "path";

export async function renameFile(currentDirectory, oldName, newName) {
  const oldPath = oldName.startsWith("/")
    ? oldName
    : join(currentDirectory, oldName);
  const newPath = newName.startsWith("/")
    ? newName
    : join(currentDirectory, newName);
  await rename(oldPath, newPath);
}
