import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.INVALID_EMAIL:
        return 'El email ingresado no es válido';

      case FirebaseCodeErrorEnum.USER_NOT_FOUND:
        return 'El usuario no existe';

      case FirebaseCodeErrorEnum.WRONG_PASSWORD:
        return 'La contraseña es incorrecta';

      case FirebaseCodeErrorEnum.EMAIL_ALREADY_IN_USE:
        return 'El email ingresado ya se encuentra registrado';

      case FirebaseCodeErrorEnum.WEAK_PASSWORD:
        return 'La contraseña debe tener al menos 6 caracteres';

      default:
        return 'Error al loguear al usuario';
    }
  }
} // End of FirebaseErrorService class

