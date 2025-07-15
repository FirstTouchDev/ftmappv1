import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrimeNgProgressBarService {
     private loadingSubject = new BehaviorSubject<boolean>(false);
     loading$ = this.loadingSubject.asObservable();

     public show(): void {
          this.loadingSubject.next(true);
     }

     public hide(): void {
          this.loadingSubject.next(false);
     }
}
