import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrimeNgLoadingSpinnerService {
     private loadingSubject = new BehaviorSubject<boolean>(false);
     private messageLoadingSubject = new BehaviorSubject<string>('Loading...');

     loading$ = this.loadingSubject.asObservable();
     messageLoadingSubject$ = this.messageLoadingSubject.asObservable();

     public show(message: string): void {
          this.loadingSubject.next(true);
          this.messageLoadingSubject.next(message);
     }

     public hide(): void {
          this.loadingSubject.next(false);
          this.messageLoadingSubject.next('');
     }
}
