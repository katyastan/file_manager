import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join } from 'path';

export const calculateHash = async (currentDirectory, filePath) => {
    const hash = createHash('sha256');
    const fullPath = filePath.startsWith('/') ? filePath : join(currentDirectory, filePath);
    const readStream = createReadStream(fullPath);
    readStream.pipe(hash)
    const end = new Promise((resolve, reject) => {
        readStream.on('error', reject);  
        readStream.on('end', resolve);   
    })
    await end;
    console.log(`Hash: ${hash.digest('hex')}`);
};