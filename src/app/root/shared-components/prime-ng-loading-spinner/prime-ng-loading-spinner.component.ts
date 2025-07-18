import { Component } from '@angular/core';
import { PrimeNgLoadingSpinnerService } from './prime-ng-loading-spinner.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
     selector: 'prime-ng-loading-bar',
     standalone: true,
     imports: [ProgressSpinnerModule, CommonModule],
     template: `
       <div *ngIf="primeNgLoadingSpinnerService.loading$ | async" class="overlay">
         <div class="spinner-container">
         <p-progress-spinner strokeWidth="1" fill="transparent"/>
           <span class="text-lg">{{ primeNgLoadingSpinnerService.messageLoadingSubject$ | async }}</span>
           
         </div>
       </div>
     `,
     styles: [`
       .overlay {
         position: fixed;
         top: 0;
         left: 0;
         width: 100vw;
         height: 100vh;
         background-color: rgba(255, 255, 255, 0.5);
         z-index: 9999;
         display: flex;
         align-items: center;
         justify-content: center;
       }
   
       .spinner-container {
         display: flex;
         flex-direction: column;
         align-items: center;
         gap: 1rem;
       }
     `]
})
export class PrimeNgLoadingBar {
     constructor(public primeNgLoadingSpinnerService: PrimeNgLoadingSpinnerService) { }
}
