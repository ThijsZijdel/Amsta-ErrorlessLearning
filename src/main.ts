import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

/**
 * Setup for the environment
 */
if (environment.production) {
  enableProdMode();
}

/**
 * Set the main app component as the bootstrap module
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
