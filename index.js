import { createInterface } from 'readline';
import { printCurrentDirectory } from './modules/utils.mjs';
import { cdCommand, upCommand, lsCommand } from './modules/navigation.mjs';
import { homedir } from 'os';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const args = process.argv.slice(2);
let username = 'Guest';
const usernameArg = args.find(arg => arg.startsWith('--username='));
if (usernameArg) {
  username = usernameArg.split('=')[1];
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

      default:
        console.log("Invalid input");
    }
  } catch (err) {
    console.error("Operation failed");
  } finally {
    printCurrentDirectory(currentDirectory);
  }
});

rl.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(1);
});
