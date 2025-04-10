import { Result } from "./result";

export interface User {
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    password: string;
    results: Result[];
  }
