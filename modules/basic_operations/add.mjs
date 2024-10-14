import { open } from "fs/promises";
import { join } from "path";

export async function addFile(currentDirectory, fileName) {
  const fullPath = join(currentDirectory, fileName);
  try {
    const fileHandle = await open(fullPath, "w");
    await fileHandle.close();
  } catch (err) {
    console.error("Operation failed");
  }
}
