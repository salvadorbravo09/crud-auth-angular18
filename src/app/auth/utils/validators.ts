import { FormGroup } from '@angular/forms';

/**
 * Función para verificar si un campo específico es requerido y está vacío
 *
 * @param field - El nombre del campo a validar, limitado a 'email' o 'password'
 * @param form - El FormGroup que contiene el campo a validar
 * @returns boolean - true si el campo:
 *   - Existe en el formulario
 *   - Ha sido tocado por el usuario (touched)
 *   - Tiene el error 'required' (está vacío)
 *
 */
export const isRequired = (field: 'email' | 'password', form: FormGroup) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('required');
};

/**
 * Función para verificar si el campo email tiene errores de formato
 *
 * @param form - El FormGroup que contiene el campo email
 * @returns boolean - true si el campo email:
 *   - Existe en el formulario
 *   - Ha sido tocado por el usuario (touched)
 *   - Tiene el error 'email' (formato inválido)
 *
 */
export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return control && control.touched && control.hasError('email');
};
