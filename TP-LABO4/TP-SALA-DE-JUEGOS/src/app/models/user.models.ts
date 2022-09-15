export class User {
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  constructor() {
    this.email = '';
    this.displayName = '';
    this.photoURL = '';
    this.emailVerified = false;
  }
}