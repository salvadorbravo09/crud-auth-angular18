import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
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
  form = this._formBuilder.group<FormSignIn>({
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
      await this._authService.signIn({ email, password });
      toast.success('Inicio de sesión exitoso');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al iniciar sesión');
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
