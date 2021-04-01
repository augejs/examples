import { boot, Logger, LogLevel } from '@augejs/core';

import { ProgramModule } from './Program.module';
import { WebServerModule } from './WebServer.module';

Logger.logLevel = LogLevel.INFO;

(async () => {
  const { programConfig } = await boot(ProgramModule);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const port: number = (programConfig as any).port || 9001;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const root: string = (programConfig as any).root;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proxyRules: string[] = (programConfig as any).proxyRules;

   await boot(WebServerModule, {
     config: {
      static: {
        dir: root,
      },
      webserver: {
        port,
      },
      proxyRules,
    }
   });
})();
