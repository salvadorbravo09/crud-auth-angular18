import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'crud-auth-ng18',
        appId: '1:899918252371:web:e75eff6fc1b0beb61bb9a6',
        storageBucket: 'crud-auth-ng18.firebasestorage.app',
        apiKey: 'AIzaSyDUo0gILuauVTZfKtQCciipMbQdVL7-efk',
        authDomain: 'crud-auth-ng18.firebaseapp.com',
        messagingSenderId: '899918252371',
        measurementId: 'G-GE3P0V8357',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
