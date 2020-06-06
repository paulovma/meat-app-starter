import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

//when angular is building the application, the whitespaces in a css file are removed.
//This config makes the angular preserve the whitespaces for the application (dev environment)
platformBrowserDynamic().bootstrapModule(AppModule) //, {preserveWhitespaces: true});
