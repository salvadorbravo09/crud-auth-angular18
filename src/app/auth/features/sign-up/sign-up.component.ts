import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

/**
 * Interface que define la estructura tipada del formulario de registro
 * Especifica que cada campo es un FormControl que puede ser de tipo string o null
 */
interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  // Inyeccion de dependencia del FormBuilder
  private _formBuilder = inject(FormBuilder);
  // Inyeccion de dependencia del servicio de autenticacion
  private _authService = inject(AuthService);
  // Inyeccion de dependencia del Router para redireccionar al usuario
  private _router = inject(Router);

  // Metodo para verificar si un campo especifico es requerido
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  // Metodo para verificar si el campo de email tiene un error
  hasEmailError() {
    return hasEmailError(this.form);
  }

  // Definicion del formulario con validaciones
  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  // Metodo que se ejecuta al enviar el formulario
  async onSubmit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      await this._authService.signUp({ email, password });
      toast.success('Registro exitoso, por favor inicia sesión');
      this._router.navigateByUrl('/auth/sign-in');
    } catch (error) {
      toast.error('Error al registrar usuario');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Inicio de sesión exitoso con Google');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al iniciar sesión con Google');
    }
  }
}
