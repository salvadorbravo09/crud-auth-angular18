import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-layout',
  template: `
    <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex items-center justify-between h-full">
        <a routerLink="/tasks" class="text-2xl font-bold">Tasks</a>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          (click)="logout()"
        >
          Salir
        </button>
      </nav>
    </header>
    <router-outlet />
  `,
})
export default class LayoutComponent {
  private _authStateService = inject(AuthStateService);
  private _router = inject(Router);

  async logout() {
    await this._authStateService.logout();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
