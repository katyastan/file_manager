import { EOL, cpus, homedir, userInfo, arch } from "os";

export async function getOSInfo(flag) {
  switch (flag) {
    case "--EOL":
      console.log(`EOL: ${JSON.stringify(EOL)}`);
      break;
    case "--cpus":
      console.log(`Overall amount of CPUS: ${JSON.stringify(cpus().length)}`);
      cpus().forEach((cpu, index) => {
        console.log(
          `CPU ${index + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(2)} GHz`
        );
      });
      break;
    case "--homedir":
      console.log(`Home directory: ${homedir()}`);
      break;
    case "--username":
      console.log(`System user name: ${userInfo().username}`);
      break;
    case "--architecture":
      console.log(`CPU architecture: ${arch()}`);
      break;
    default:
      throw new Error("Invalid input");
  }
}
