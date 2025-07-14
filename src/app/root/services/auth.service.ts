import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from '../constants/local-storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(
        private localStorageService: LocalStorageService
    ){
        const isLoggedIn = localStorageService.get(LocalStorageKey.ISLOGGEDIN) === 'true';
        this.loggedIn.next(isLoggedIn);
    }

    public login(): void {
        this.localStorageService.set(LocalStorageKey.ISLOGGEDIN, true);
        this.loggedIn.next(true);
    }

    public logout(): void {
        this.localStorageService.set(LocalStorageKey.ISLOGGEDIN, false);
        this.loggedIn.next(false);
    }
}
