import { createReadStream, createWriteStream } from 'fs';
import { open, rename, unlink } from 'fs/promises';
import { join, resolve, basename } from 'path';

export async function readFile(currentDirectory, filePath) {
    const fullPath = resolve(currentDirectory, filePath);
    const readStream = createReadStream(fullPath, 'utf-8');

    readStream.on('data', chunk => {
        console.log(`File content:`);
        console.log('---------------------------------------------------------')
        console.log(chunk);
        console.log('---------------------------------------------------------')
    });

    readStream.on('error', () => {
        throw new Error('Operation failed');
    });
}

export async function addFile(currentDirectory, fileName) {
    const fullPath = join(currentDirectory, fileName);
    const fileHandle = await open(fullPath, 'w');
    await fileHandle.close();
}


// todo

export async function renameFile(currentDirectory, newName) {
    const oldPath = join(currentDirectory, oldName);
    const newPath = join(currentDirectory, newName);
    await rename(oldPath, newPath);
}


export async function copyFile(currentDirectory, src, dest) {
    const srcPath = resolve(currentDirectory, src);
    const destPath = resolve(currentDirectory, dest, basename(src));

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);

    readStream.pipe(writeStream);

    readStream.on('error', () => {
        throw new Error('Operation failed');
    });
}


// todo

export async function deleteFile(currentDirectory, filePath) {
    const fullPath = join(currentDirectory, filePath);
    await unlink(fullPath);
}

// todo

export async function moveFile(currentDirectory, src, dest) {
    await copyFile(currentDirectory, src, dest);
    await deleteFile(currentDirectory, src);
}


