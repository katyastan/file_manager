import { resolve } from "path";

export async function upCommand(currentDirectory) {
  const parentDir = resolve(currentDirectory, "..");
  if (parentDir !== currentDirectory) {
    return parentDir;
  }
  return currentDirectory;
}
