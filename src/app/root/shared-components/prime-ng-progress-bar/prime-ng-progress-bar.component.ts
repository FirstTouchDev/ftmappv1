import { Component } from '@angular/core';
import { PrimeNgProgressBarService } from './prime-ng-progress-bar.service';
import { ProgressBar } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';

@Component({
     selector: 'prime-ng-progress-bar',
     standalone: true,
     imports: [ProgressBar, CommonModule],
     template: `
    <div *ngIf="primeNgProgressBarService.loading$ | async">
      <!-- Progress bar on top -->
      <p-progressbar mode="indeterminate" [style]="{ height: '6px' }"></p-progressbar>

      <!-- Fullscreen blocker -->
      <div class="screen-blocker"></div>
    </div>
  `,
     styles: [`
    .screen-blocker {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.5); /* semi-transparent */
      z-index: 9998; /* just under the progressbar */
      pointer-events: all;
    }

    p-progressbar {
      z-index: 9999;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
  `]
})
export class PrimeNgProgressBar {
     constructor(public primeNgProgressBarService: PrimeNgProgressBarService) { }
}
