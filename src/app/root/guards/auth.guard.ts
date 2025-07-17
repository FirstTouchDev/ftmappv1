import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorageKey } from '../constants/local-storage';

@Injectable({
     providedIn: 'root'
})
export class AuthGuard implements CanActivate {

     constructor(
          private localStorageService: LocalStorageService,
          private router: Router
     ) { }

     canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
          const userId = this.localStorageService.get<string>(LocalStorageKey.DOCUMENTMASTERUSERID);
          const publicRoutes = ['login', 'signup']; // ⬅️ treat both as public
          const isPublicRoute = publicRoutes.includes(route.routeConfig?.path || '');
     
          if (!userId) {
               // Not logged in: allow public routes, otherwise redirect to login
               return of(isPublicRoute ? true : this.router.createUrlTree(['/login']));
          }
     
          // Logged in: redirect public routes to home, otherwise allow access
          return of(isPublicRoute ? this.router.createUrlTree(['/home']) : true);
     }
     
}
