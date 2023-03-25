import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
     platformBrowserDynamic([
  { provide: 'API_BASE', useValue: environment.apiBase },
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
   }


 if (document.readyState === 'complete') {
   bootstrap();
 } else {
   document.addEventListener('DOMContentLoaded', bootstrap);
 }

