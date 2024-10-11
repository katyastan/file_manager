import { homedir } from 'os';

export let currentDirectory = homedir();
export function printCurrentDirectory(currentDirectory) {
    console.log(`You are currently in ${currentDirectory}`);
}
