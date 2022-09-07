import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';    // Tengo que agregar esto en cada componente que quiera usar toastr
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/service/firebase-error.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  restoreUser: FormGroup;
  loading = false;


  constructor(private fb: FormBuilder,  // Inyectamos el servicio de formularios
    private afAuth: AngularFireAuth,    // Inyectamos el servicio de autenticación de Firebase
    private toastr: ToastrService,      // Tengo que agregar esto en cada componente que quiera usar toastr
    private router: Router,             // Inyectamos el servicio de ruteo
    private firebaseError: FirebaseErrorService,  // Inyectamos el servicio de errores de Firebase
  ) {
    this.restoreUser = this.fb.group({
      email: ['', Validators.required],
    })
  }

  restore() {
    const email = this.restoreUser.get('email')?.value;
    this.loading = true;                                                            // Muestro el spinner
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.loading = false;                                                       // Oculto el spinner una vez que loguea 
        this.toastr.success('Se ha enviado un correo para restablecer la contraseña', 'Restablecer contraseña');
        this.router.navigate(['/login']);
      }
      ).catch(error => {
        this.loading = false;                                                       // Oculto el spinner una vez que loguea 
        this.toastr.error(this.firebaseError.codeError(error.code));                          // Mostramos el error en pantalla
      }
      )
  }

  ngOnInit(): void {
  }
} // End of RestorePasswordComponent class
