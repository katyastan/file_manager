import { stat } from "fs/promises";
import { resolve } from "path";

export async function upCommand(currentDirectory) {
  const parentDir = resolve(currentDirectory, "..");
  if (parentDir !== currentDirectory) {
    return parentDir;
  }
  return currentDirectory;
}


export async function cdCommand(currentDirectory, dir) {
  const newDir = resolve(currentDirectory, dir);
  try {
    const stats = await stat(newDir);
    if (stats.isDirectory()) {
      return newDir;
    }
  } catch (err) {
    throw new Error("Operation failed");
  }
  return currentDirectory;
}
