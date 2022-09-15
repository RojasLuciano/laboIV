import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';    // Tengo que agregar esto en cada componente que quiera usar toastr
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/service/errorFirebase/firebase-error.service';
import { LogsService } from 'src/app/service/logs/logs.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginUsuario: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService,
    private logService: LogsService,
    private db: AngularFirestore
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

  login() {
    const email = this.loginUsuario.get('email')?.value;
    const password = this.loginUsuario.get('password')?.value;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.loading = false;
        this.toastr.success('Usuario logueado con éxito', 'Login exitoso');
        this.router.navigate(['/home']);
        this.logService.registerUserLoginTime(this.loginUsuario);
      }
      ).catch(error => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code));
      }
      )
  }

  fastLogin() {
    this.loginUsuario.get('email')?.setValue('fastlogin@gmail.com');
    this.loginUsuario.get('password')?.setValue('123456');
  }

  ngOnInit(): void {
  }
}


