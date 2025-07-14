import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn$.pipe(
            tap((loggedIn: boolean) => {
                if (!loggedIn) {
                    this.router.navigate(['/login']);
                }
            }),
            map((loggedIn: boolean) => loggedIn)
        );
    }

}
