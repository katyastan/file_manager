import { createInterface } from "readline";
import { printCurrentDirectory } from "./modules/utils.mjs";
import { cdCommand } from "./modules/nwd/cd.mjs";
import { upCommand } from "./modules/nwd/up.mjs";
import { lsCommand } from "./modules/nwd/ls.mjs";
import { homedir } from "os";
import { addFile } from "./modules/basic_operations/add.mjs";
import { copyFile } from "./modules/basic_operations/cp.mjs";
import { deleteFile } from "./modules/basic_operations/rm.mjs";
import { moveFile } from "./modules/basic_operations/mv.mjs";
import { readFile } from "./modules/basic_operations/cat.mjs";
import { renameFile } from "./modules/basic_operations/rn.mjs";
import { getOSInfo } from "./modules/os_info/osInfo.mjs";
import { calculateHash } from "./modules/hash/hashCalc.mjs";
import { compressFile } from "./modules/compress_decompess/compress.mjs";
import { decompressFile } from "./modules/compress_decompess/decompress.mjs";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv.slice(2);
let username = "Guest";
const usernameArg = args.find((arg) => arg.startsWith("--username="));
if (usernameArg) {
  username = usernameArg.split("=")[1];
} else {
  console.error(`No username provided. Using default username: ${username}`);
}

let currentDirectory = homedir();

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory(currentDirectory);

rl.on("line", async (input) => {
  const [command, ...restArgs] = input.trim().split(" ");

  try {
    switch (command) {
      case ".exit":
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
      case "up":
        currentDirectory = await upCommand(currentDirectory);
        break;
      case "cd":
        currentDirectory = await cdCommand(currentDirectory, restArgs[0]);
        break;
      case "ls":
        await lsCommand(currentDirectory);
        break;
      case "cat":
        await readFile(currentDirectory, restArgs[0]);
        break;
      case "add":
        await addFile(currentDirectory, restArgs[0]);
        break;
      case "rn":
        await renameFile(currentDirectory, restArgs[0], restArgs[1]);
        break;
      case "cp":
        await copyFile(currentDirectory, restArgs[0], restArgs[1]);
        break;
      case "mv":
        await moveFile(currentDirectory, restArgs[0], restArgs[1]);
        break;
      case "rm":
        await deleteFile(currentDirectory, restArgs[0]);
        break;
      case "os":
        await getOSInfo(restArgs[0]);
        break;
      case "hash":
        await calculateHash(currentDirectory, restArgs[0]);
        break;
      case "compress":
        if (restArgs[0] && restArgs[1]) {
          await compressFile(restArgs[0], restArgs[1]);
        } else {
          console.error(
            "Invalid input: Missing source or destination for 'compress' command."
          );
        }
        break;
      case "decompress":
        if (restArgs[0] && restArgs[1]) {
          await decompressFile(restArgs[0], restArgs[1]);
        } else {
          console.error(
            "Invalid input: Missing source or destination for 'decompress' command."
          );
        }
        break;

      default:
        console.error("Invalid input");
    }
  } catch (err) {
    console.error("Operation failed");
  } finally {
    printCurrentDirectory(currentDirectory);
  }
});

rl.on("SIGINT", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(1);
});
