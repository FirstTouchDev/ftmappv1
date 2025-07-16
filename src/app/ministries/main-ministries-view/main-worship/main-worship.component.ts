import { Component, Input, OnInit, signal } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { PrimeNgDialogComponent } from '../../../root/shared-components/prime-ng-dialog/prime-ng-dialog.component';;
import { ConfirmationService } from 'primeng/api';
import { CurrentLoggedInUserService } from '../../../root/services/current-logged-in-user.service';
import { PrimeNgHeaderComponent } from '../../../root/shared-components/prime-ng-header/prime-ng-header.component';
import { PrimeNgFooterComponent } from '../../../root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { SubmitLineUpComponent } from './submit-line-up/submit-line-up.component';
import { FirebaseService } from '../../../root/services/firebase.service';
import { Collection, Field } from '../../../root/constants/firebase';
import { take, tap } from 'rxjs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { LineUp } from '../../../root/models/line-up.model';

@Component({
     selector: 'main-worship',
     templateUrl: './main-worship.component.html',
     styleUrls: ['./main-worship.component.scss'],
     standalone: true,
     imports: [
          PrimeNgDialogComponent,
          PrimeNgFooterComponent,
          PrimeNgHeaderComponent,
          ButtonModule,
          PanelModule,
          SubmitLineUpComponent,
          CardModule,
          CommonModule
     ],
     providers: [ConfirmationService]
})
export class MainWorshipComponent implements OnInit {

     public isSubmitLineUpDialogVisible = false;
     private currentLoggedInUserId: string = '';
     protected lineUps: LineUp[] = [];

     items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

     constructor(
          private firebaseService: FirebaseService,
          private currentLoggedInUserService: CurrentLoggedInUserService
          
     ) {

          // this.currentLoggedInUserService.userId$.pipe(take(1)).subscribe(userId => {
          //      this.currentLoggedInUserId = userId || '';
             
          //      this.firebaseService.adminGetAllData$<LineUp>(Collection.LINEUPS).pipe(
          //           tap((res)=> {
          //                this.lineUps = res.;
          //                console.log("line up", this.lineUps);
          //           })
          //      ).subscribe();
          // });             

     }



     ngOnInit() {
       
     }

     public openSubmitLineUpDialog(): void {
          this.isSubmitLineUpDialogVisible = true;
     }

}
