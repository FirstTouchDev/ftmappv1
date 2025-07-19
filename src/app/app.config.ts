import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import Nora from '@primeuix/themes/nora';
import Material from '@primeuix/themes/material';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
     providers: [
          provideAnimations(),
          provideZoneChangeDetection({ eventCoalescing: true }),
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideFirestore(() => getFirestore()),
          provideRouter(routes),
          providePrimeNG({
               theme: {
                    preset: Aura,
                    options: {
                    darkModeSelector: '.dark-mode'
               }
               }
          }),
          MessageService,
          ConfirmationService,
          
     ]
};
