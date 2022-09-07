import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';    // Tengo que agregar esto en cada componente que quiera usar toastr
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/service/firebase-error.service';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss']
})
export class RegisterUsersComponent implements OnInit {
  registrarUsuario : FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,  // Inyectamos el servicio de formularios
    private afAuth: AngularFireAuth,    // Inyectamos el servicio de autenticación de Firebase
    private toastr: ToastrService,      // Tengo que agregar esto en cada componente que quiera usar toastr
    private router: Router,             // Inyectamos el servicio de ruteo
    private firebaseError: FirebaseErrorService,  // Inyectamos el servicio de errores de Firebase

    ) { 
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['',Validators.required],

  })
  }

register(){
  const email = this.registrarUsuario.get('email')?.value;
  const password = this.registrarUsuario.get('password')?.value;
  const repetirPassword = this.registrarUsuario.get('repetirPassword')?.value;

  if(password !== repetirPassword){
    this.toastr.error('Las contraseñas no coinciden', 'Error');
    return;
  }
  this.loading = true;                                                          // Muestro el spinner
  this.afAuth.createUserWithEmailAndPassword(email,password)
  .then(() => {
    // this.loading = false;                                                       // Oculto el spinner una vez que loguea 
    // this.toastr.success('Usuario registrado con éxito', 'Registro exitoso');
    // this.router.navigate(['/login']);                                           // Redireccionamos al usuario a la página de login provisoriamente
    this.verifyEmail();
  }).catch(error => {
    this.loading = false;                                                       
    this.toastr.error(this.firebaseError.codeError(error.code));                       
  })
}

verifyEmail(){
  this.afAuth.currentUser
  .then(user => {
    user?.sendEmailVerification()
    .then(() => {
      this.loading = false;                                                       // Oculto el spinner una vez que loguea
      this.toastr.info('Se ha enviado un correo de verificación a su casilla de correo', 'Verifique su casilla de correo');
      this.router.navigate(['/login']);                                           // Redireccionamos al usuario a la página de login provisoriamente
    }).catch(error => {
      this.loading = false;                                                       // Oculto el spinner una vez que loguea
      this.toastr.error(this.firebaseError.codeError(error.code));
    })
  })
}


  ngOnInit(): void {
  }

}  

