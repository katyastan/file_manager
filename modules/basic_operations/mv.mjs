import { copyFile } from "./cp.mjs";
import { deleteFile } from "./rm.mjs";

export async function moveFile(currentDirectory, src, dest) {
  await copyFile(currentDirectory, src, dest);
  await deleteFile(currentDirectory, src);
}
