import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task-list.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./task-form/task-form.component'),
  },
  {
    path: 'update/:idTask',
    loadComponent: () => import('./task-form/task-form.component'),
  },
] as Routes;
