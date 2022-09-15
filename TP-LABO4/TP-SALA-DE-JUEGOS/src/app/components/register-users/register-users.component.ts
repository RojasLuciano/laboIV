import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';    // Tengo que agregar esto en cada componente que quiera usar toastr
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/service/errorFirebase/firebase-error.service';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss']
})
export class RegisterUsersComponent implements OnInit {
  registrarUsuario : FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, 
    private afAuth: AngularFireAuth,    
    private toastr: ToastrService,    
    private router: Router,          
    private firebaseError: FirebaseErrorService,
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
  this.loading = true;                                                         
  this.afAuth.createUserWithEmailAndPassword(email,password)
  .then(() => {
    this.loading = false;                                                      
    this.toastr.success('Usuario registrado con éxito', 'Registro exitoso');
    this.router.navigate(['/home']);                                         
   // this.verifyEmail();
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
      this.loading = false;                                                     
      this.toastr.info('Se ha enviado un correo de verificación a su casilla de correo', 'Verifique su casilla de correo');
      this.router.navigate(['/login']);                                           
    }).catch(error => {
      this.loading = false;                                                      
      this.toastr.error(this.firebaseError.codeError(error.code));
    })
  })
}

  ngOnInit(): void {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    })
    // this.registrarUsuario.setValue({
    //   email: 'email'+ Math.floor(Math.random() * 1000) + '@gmail.com',
    //   password: '123456',
    //   repetirPassword: '123456',
    // })  
    }

}  
