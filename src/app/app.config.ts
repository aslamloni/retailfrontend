import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const APP_CONFIG = new InjectionToken<typeof environment>('app.config description');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    //provideHttpClient(withInterceptors([authInterceptor]),),
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: environment },
  ]
};
