import { boot, Logger, LogLevel } from '@augejs/module-core';

import { ProgramModule } from './Program.module';
import { WebServerModule } from './WebServer.module';

Logger.logLevel = LogLevel.INFO;

(async () => {
  const { programConfig } = await boot(ProgramModule);

  const port: number = programConfig.port || 9001;
  const root: string = programConfig.root;
  const proxyRules: string[] = programConfig.proxyRules;

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
