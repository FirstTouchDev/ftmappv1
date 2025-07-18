import { Component, Input, OnInit, signal } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { PrimeNgDialogComponent } from '../../../root/shared-components/prime-ng-dialog/prime-ng-dialog.component';;
import { ConfirmationService } from 'primeng/api';
import { PrimeNgHeaderComponent } from '../../../root/shared-components/prime-ng-header/prime-ng-header.component';
import { PrimeNgFooterComponent } from '../../../root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { SubmitLineUpComponent } from './submit-line-up/submit-line-up.component';
import { FirebaseService } from '../../../root/services/firebase.service';
import { Collection, Field } from '../../../root/constants/firebase';
import { finalize, take, tap } from 'rxjs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { LineUp } from '../../../root/models/line-up.model';
import { DataHydrationService } from '../../../root/services/data-hydration.service';
import { DateTimePipe } from '../../../root/pipes/datetime.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { PrimeNgLoadingSpinnerService } from '../../../root/shared-components/prime-ng-loading-spinner/prime-ng-loading-spinner.service';
import { DividerModule } from 'primeng/divider';
import { computed } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
     selector: 'main-worship',
     templateUrl: './main-worship.component.html',
     styleUrls: ['./main-worship.component.scss'],
     standalone: true,
     imports: [
          PrimeNgDialogComponent,
          ButtonModule,
          PanelModule,
          SubmitLineUpComponent,
          CardModule,
          CommonModule,
          DateTimePipe,
          SkeletonModule,
          DividerModule,
     ],
     providers: [ConfirmationService]
})
export class MainWorshipComponent implements OnInit {


     public isSubmitLineUpDialogVisible = false;

     protected lineUps = signal<LineUp[]>([]);
     protected isFetchingData = signal<boolean>(false);
     items = [1, 2, 3, 4, 5, 6]


     protected sortedLineUps = computed(() => {
          return this.lineUps().slice().sort((a, b) => {
               const getTimestamp = (date: any) => {
                    if (date?.toDate instanceof Function) {
                         return date.toDate().getTime();
                    } 
                    
                    else if (date instanceof Date) {
                         return date.getTime(); 
                    } 
                    
                    else {
                         return 0;
                    }
               };

               return getTimestamp(b.worshipDate) - getTimestamp(a.worshipDate);
          });
     });

     constructor(
          private firebaseService: FirebaseService,
          private dataHydrationService: DataHydrationService,
          private primeNgLoadingSpinnerService: PrimeNgLoadingSpinnerService

     ) {
          this.primeNgLoadingSpinnerService.show('Fetching Line Ups...');
          this.isFetchingData.set(true);
          this.firebaseService.adminGetAllData$<LineUp>(Collection.LINEUPS).pipe(
               tap((lineUps: LineUp[]) => {
                    this.lineUps.set(lineUps);
               }),
               finalize(() => {
                    this.primeNgLoadingSpinnerService.hide();
                    this.isFetchingData.set(false);
               })
          ).subscribe();

          // this.dataHydrationService.hydrateReferences$<LineUp>(
          //      this.firebaseService.adminGetAllData$<LineUp>(Collection.LINEUPS),
          //      {
          //           singers: { collection: Collection.USERS, isArray: true },
          //      }
          // ).subscribe({
          //      next: hydratedLineUps => {
          //           this.lineUps.set(hydratedLineUps);
          //      },
          //      error: err => {
          //           console.error('Hydration error:', err);
          //      },
          //      complete: () => {

          //      }
          // });

     }



     ngOnInit() {

     }

     public onLineUpAdded(newlyAddedLineUp: LineUp) {
          this.lineUps.update((lineUps) => [...lineUps, newlyAddedLineUp]);
     }

     public openSubmitLineUpDialog(): void {
          this.isSubmitLineUpDialogVisible = true;
     }

 

}
