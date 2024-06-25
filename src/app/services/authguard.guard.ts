import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; 
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = async (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

    // Verificar si el usuario está logueado
  const isLoggedIn = await authService.isLoggedIn();

      // Si el usuario está logueado  
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);  // Redirigir a la página de login
    return false;
  }
};
