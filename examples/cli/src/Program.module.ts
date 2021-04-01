import fs from 'fs';
import path from 'path';

import { Module, IScanNode } from '@augejs/core';
import commander from 'commander';

@Module()
export class ProgramModule {
  async onInit(scanNode: IScanNode): Promise<void> {
    commander.program
    .version('0.0.1')
    .usage("[options] dir")
    .option(`-p --port [number]`, `Optional to the http server, default 9001`, val => parseInt(val))
    .option(`-h --help`, `Shows this help message`)
    .arguments('[dir]')
    .action(async (dir) => {
      if (!dir) {
        commander.program.help();
      }

      const staticPath: string = path.join(process.cwd() , dir || '.');
      if (!fs.existsSync(staticPath)) {
        console.log(`The dir path '${dir}' is not exist!`);
        process.exit(1);
      }

      scanNode.context.programConfig = {
        root: staticPath,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        port: (commander.program as any).port,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        proxyRules: (commander.program as any).rule
      };
    })
    .parse(process.argv)
  }
}
