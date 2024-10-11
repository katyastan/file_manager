import { createInterface } from 'readline';
import { printCurrentDirectory, currentDirectory } from './modules/utils.mjs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Guest';


console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory(currentDirectory);

rl.on('line', async (input) => {
    const [command, ...restArgs] = input.trim().split(' ');

    try {
        switch (command) {
            case '.exit':
                console.log(`Thank you for using File Manager, ${username}, goodbye!`);
                process.exit(0);

            default:
                console.log('Invalid input');
        }
    } catch (err) {
        console.error('Operation failed');
    } finally {
        printCurrentDirectory(currentDirectory);
    }
});

rl.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(1);
});
