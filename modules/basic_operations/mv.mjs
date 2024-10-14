export async function moveFile(currentDirectory, src, dest) {
  await copyFile(currentDirectory, src, dest);
  await deleteFile(currentDirectory, src);
}
