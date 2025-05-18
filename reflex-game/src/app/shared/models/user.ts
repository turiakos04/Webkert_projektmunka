import { Result } from "./result";

export interface User {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password?: string; // A jelszó opcionális, mivel nem mindig akarjuk ezt az objektumban tárolni
  results: Result[];
  // id?: string; // Opcionálisan egyedi azonosító, ha a backend adja
}