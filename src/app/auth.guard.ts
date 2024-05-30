import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
 const router : Router = inject(Router);
 const authService : AuthService = inject(AuthService);
 if(authService.isLoggedIn ){
    return true;
 }else{    
 router.navigate(['/login']);
 return false;
 }

};


