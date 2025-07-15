import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class CurrentLoggedInUserService {

     private userIdSubject = new BehaviorSubject<string | null>(null);
     userId$: Observable<string | null> = this.userIdSubject.asObservable();

     constructor() { }

     public setUserId(userId: string): void {
          this.userIdSubject.next(userId);
     }

     public clearUserId(): void {
          this.userIdSubject.next(null);
     }

     public getUserId(): string | null {
          return this.userIdSubject.value;
     }
}
