export class User {
  email: string;
  name: string;
  photoURL: string;
  emailVerified: boolean;
  constructor() {
    this.email = '';
    this.name = '';
    this.photoURL = '';
    this.emailVerified = false;
  }
}