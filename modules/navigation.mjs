import { readdir, stat } from "fs/promises";
import { resolve, join } from "path";

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


export async function lsCommand(currentDirectory) {
  try {
    const files = await readdir(currentDirectory);
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = join(currentDirectory, file);
        const stats = await stat(filePath);
        return {
          name: file,
          type: stats.isDirectory() ? "Directory" : "File",
        };
      })
    );
    const directories = fileDetails
      .filter((f) => f.type === "Directory")
      .sort((a, b) => a.name.localeCompare(b.name));

    const nonDirectories = fileDetails
      .filter((f) => f.type === "File")
      .sort((a, b) => a.name.localeCompare(b.name));

    const sortedFiles = [...directories, ...nonDirectories];

    if (sortedFiles.length === 0) {
      console.error("No files or directories found");
      return;
    }
    console.table(sortedFiles);
  } catch (err) {
    throw new Error("Operation failed");
  }
}
