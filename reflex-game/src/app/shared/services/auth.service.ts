import { Injectable } from '@angular/core';
import {
  Auth, // Importáljuk a Firebase Auth service-t
  signInWithEmailAndPassword, // Importáljuk a bejelentkezés funkciót
  signOut, // Importáljuk a kijelentkezés funkciót
  authState, // Importáljuk az autentikációs állapot observable-t
  User, // Importáljuk a Firebase User típust
  UserCredential // Importáljuk a UserCredential típust
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Töröld a mock User interface importját, ha már nincs máshol használva,
// mivel most a Firebase User típust használjuk.
// import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ez az Observable követi a Firebase autentikációs állapotát.
  // Kibocsátja a jelenlegi Firebase User objektumot (vagy null-t, ha nincs bejelentkezve)
  // minden alkalommal, amikor az állapot változik.
  currentUser: Observable<User | null>;

  constructor(
    // Injeltáljuk a Firebase Auth service-t
    private auth: Auth,
    private router: Router
  ) {
    // Az authState(@angular/fire/auth) függvény adja vissza az autentikációs
    // állapotot figyelő Observable-t a megadott Auth példányhoz.
    this.currentUser = authState(this.auth);
    console.log("AuthService konstruktor futott."); // Debug célra
  }

  /**
   * Bejelentkezteti a felhasználót email címmel és jelszóval a Firebase Authentication segítségével.
   * @param email A felhasználó email címe.
   * @param password A felhasználó jelszava.
   * @returns Promise, ami sikeres bejelentkezéskor UserCredential-lel oldódik fel, vagy hibával utasítódik vissza.
   */
  signIn(email: string, password: string): Promise<UserCredential> {
    console.log(`Attempting sign in for: ${email}`); // Debug célra
    // Használjuk a Firebase SDK bejelentkezési funkcióját
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log("Sign in successful", userCredential.user); // Debug célra
        // Itt nem kell localStorage-t frissíteni, a Firebase kezeli az állapotot
        return userCredential;
      })
      .catch((error) => {
        console.error("Sign in failed", error); // Debug célra
        // Dobd tovább a hibát, hogy a komponenst kezelni tudja
        throw error;
      });
  }

  /**
   * Kijelentkezteti a jelenlegi felhasználót a Firebase Authentication segítségével.
   * Sikeres kijelentkezés után a 'home' oldalra navigál.
   * @returns Promise, ami sikeres kijelentkezéskor oldódik fel.
   */
  signOut(): Promise<void> {
    console.log("Attempting sign out"); // Debug célra
    // Használjuk a Firebase SDK kijelentkezési funkcióját
    return signOut(this.auth).then(() => {
      console.log("Sign out successful. Navigating to /home"); // Debug célra
      // Itt nem kell localStorage-t frissíteni
      this.router.navigateByUrl('/home');
    }).catch((error) => {
       console.error("Sign out failed", error); // Debug célra
       throw error; // Dobd tovább a hibát
    });
  }

  /**
   * Visszaad egy Observable-t, ami a Firebase autentikációs állapotát jelzi.
   * Ezt lehet használni annak ellenőrzésére, hogy a felhasználó be van-e jelentkezve
   * (az Observable egy User objektumot bocsát ki, ami nem null).
   * @returns Observable a Firebase User objektumról vagy null.
   */
  isLoggedIn(): Observable<User | null> {
    // Az authState observable közvetlenül reprezentálja a bejelentkezési állapotot
    return this.currentUser;
  }

  /**
   * Visszaadja a jelenleg bejelentkezett felhasználó email címét.
   * MEGYJEGYZÉS: Ez a Firebase SDK *aktuális* állapotát olvassa, nem feltétlenül
   * az authState observable legutóbbi értékét. Állapotváltozásokra reagáláshoz
   * az isLoggedIn() observable-t használd.
   * @returns A felhasználó email címe vagy null, ha nincs bejelentkezve.
   */
  getCurrentUserEmail(): string | null {
     // Közvetlenül hozzáférünk a Firebase Auth példány aktuális felhasználójához
     const user = this.auth.currentUser;
     return user ? user.email : null;
  }

  /**
   * Visszaadja a jelenleg bejelentkezett felhasználó megjelenített nevét (displayName).
   * MEGYJEGYZÉS: Ez a Firebase SDK *aktuális* állapotát olvassa. A Firebase
   * Authentication csak egyetlen string-et tárol 'displayName' néven. Ha a profil
   * komponens külön keresztnévre és vezetéknévre számít (mint az előző mockban),
   * akkor a displayName stringet kell majd ott feldolgozni, vagy a Firebase
   * felhasználóhoz kell extra adatokat (pl. vezeték/keresztnév) tárolni
   * egy adatbázisban (pl. Firestore).
   * @returns A felhasználó megjelenített neve vagy 'Vendég', ha nincs bejelentkezve vagy a név nincs beállítva.
   */
  getCurrentUserDisplayName(): string {
     // Közvetlenül hozzáférünk a Firebase Auth példány aktuális felhasználójához
     const user = this.auth.currentUser;
     // Használjuk a Firebase User objektum displayName property-jét
     // Ha nincs bejelentkezve vagy a displayName nincs beállítva, visszaadja a 'Vendég'-et.
     return user?.displayName || 'Vendég';
  }

  // Töröld a mock service-ből származó felesleges metódusokat:
  // updateLoginStatus(isLoggedIn: boolean): void {...}
  // register(userData: Omit<User, 'results'>): Observable<AuthUser> {...}
  // login(credentials: { email: string, password: string }): Observable<AuthUser> {...} // Ezt helyettesíti a signIn
  // logout(): void {...} // Ezt helyettesíti a signOut
  // private getRegisteredUsers(): User[] {...}

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }

}