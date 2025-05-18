import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ projectId: "reflex-game-6438b", 
      appId: "1:1087108597815:web:0565e3fa275c83ec0057b2", 
      storageBucket: "reflex-game-6438b.firebasestorage.app", 
      apiKey: "AIzaSyDMOsV3F279LbqG4caOey73LSFLtKtEXJg", 
      authDomain: "reflex-game-6438b.firebaseapp.com", 
      messagingSenderId: "1087108597815" })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore())]
};
