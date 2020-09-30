


import { Module, Logger, ILogger, Inject, boot } from '@augejs/module-core';
import { I18N_IDENTIFIER, I18n, II18n } from '@augejs/i18n';

const logger:ILogger = Logger.getLogger('app');

@I18n({
  defaultLocale: 'zh',
})
@Module()
class AppModule {

  @Inject(I18N_IDENTIFIER)
  i18n!: II18n;

  async onInit() {
    logger.info('app onInit');
  }

  async onAppDidReady () {
    logger.info('app onAppDidReady');

    logger.info(this.i18n.formatTime(Date.now()));

    logger.info(this.i18n.formatDate(Date.now(), {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }));

    logger.info(this.i18n.formatRelativeTime(10));
    logger.info(this.i18n.get('en').formatRelativeTime(10));
    // missing local will change to default.
    logger.info(this.i18n.get('haha').formatRelativeTime(10));

    logger.info(this.i18n.formatNumber(1000, {style: 'currency', currency: 'USD'}));

    logger.info(this.i18n.formatNumber(1000, {
      style: 'unit',
      unit: 'kilobyte',
      unitDisplay: 'narrow',
    }));

    logger.info(this.i18n.formatPlural(4));
    logger.info(this.i18n.formatList(['Me', 'myself', 'I'], {type: 'conjunction'}));

    logger.info(this.i18n.formatList(['5 hours', '3 minutes'], {type: 'unit'}));

    logger.info(this.i18n.formatDisplayName('zh-Hans-SG', {type: 'language'}));
    logger.info(this.i18n.formatDisplayName('Deva', {type: 'script'}));

    logger.info(this.i18n.formatDisplayName('CNY', {type: 'currency'}));

    logger.info(this.i18n.formatMessage({id: 'hello'}, {
      name: 'Sara'
    }));

    logger.info(this.i18n.get('zh').formatMessage({id: 'hello'}, {
      name: 'Sara'
    }));

    logger.info(this.i18n.get('en').formatMessage({id: 'hello'}, 
    {
      name: 'Sara'
    }));
  }
}

async function main() {
  await boot(AppModule);
}

main();

