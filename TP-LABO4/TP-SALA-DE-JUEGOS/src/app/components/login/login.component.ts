import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';    // Tengo que agregar esto en cada componente que quiera usar toastr
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/service/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUsuario : FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,  // Inyectamos el servicio de formularios
    private afAuth: AngularFireAuth,    // Inyectamos el servicio de autenticación de Firebase
    private toastr: ToastrService,      // Tengo que agregar esto en cada componente que quiera usar toastr
    private router: Router,             // Inyectamos el servicio de ruteo
    private firebaseError: FirebaseErrorService,  // Inyectamos el servicio de errores de Firebase
    ) { 
    this.loginUsuario = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],

  })
  }
  login(){
    const email = this.loginUsuario.get('email')?.value;
    const password = this.loginUsuario.get('password')?.value;

    this.loading = true;                                                          // Muestro el spinner
    this.afAuth.signInWithEmailAndPassword(email,password)
    .then((user) => {

      if(user.user?.emailVerified){                                             // Si el usuario verificó su email
        this.loading = false;                                                       // Oculto el spinner una vez que loguea 
        this.toastr.success('Usuario logueado con éxito', 'Login exitoso');
        this.router.navigate(['/dashboard']);                                       // Redirecciono al home
      } else {
        this.loading = false;                                                       // Oculto el spinner una vez que loguea
        this.toastr.error('Debe verificar su email', 'Error');
        this.router.navigate(['/validate-email']);                                                     // Deslogueo al usuario
        
      }


                                          // Redireccionamos al usuario a la página de login provisoriamente
    }
    ).catch(error => {
      this.loading = false;                                                       // Oculto el spinner una vez que loguea 
      this.toastr.error(this.firebaseError.codeError(error.code));                          // Mostramos el error en pantalla
    }
    )
  }

  ngOnInit(): void {
  }

}
