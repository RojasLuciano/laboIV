import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../errorFirebase/firebase-error.service';
import { ToastrService } from 'ngx-toastr';    // Tengo que agregar esto en cada componente que quiera usar toastr

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afauth: AngularFireAuth, private router: Router, private firebaseError: FirebaseErrorService, private toastr: ToastrService,) { }

  async login(email: string, password: string) {

    return await this.afauth.signInWithEmailAndPassword(email, password)
      .then(res => this.router.navigate(['home']))
      .catch(error => {
        this.toastr.error(this.firebaseError.codeError(error.code));
      })
  }

  async register(email: string, password: string) {
    return await this.afauth.createUserWithEmailAndPassword(email, password).then(res => this.router.navigate([''])).catch(error => {
      this.toastr.error(this.firebaseError.codeError(error.code));
    });
  }

  async logout() {
    return await this.afauth.signOut().then(res => this.router.navigate(['login'])).catch(error => {
      ;
      throw new Error('Error en desloguearse');
    });
  }

  getAuth() {
    return this.afauth.authState; // devuelve el usuario completo.
  }

} // End of AuthService class
