import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from "@angular/common/http";
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
  withNoHttpTransferCache
} from "@angular/platform-browser";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    provideClientHydration(withIncrementalHydration())
  ]
};

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
