import { Component, Input, OnInit, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { PrimeNgDialogComponent } from '../../root/shared-components/prime-ng-dialog/prime-ng-dialog.component';
import { PrimeNgHeaderComponent } from '../../root/shared-components/prime-ng-header/prime-ng-header.component';
import { PrimeNgFooterComponent } from '../../root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


type Ministry = {
     ministryName: string;
     description: string;
     icon: string;
     route: string;
}

@Component({
     selector: 'main-ministries',
     templateUrl: './main-ministries.component.html',
     styleUrls: ['./main-ministries.component.scss'],
     standalone: true,
     imports: [
          PrimeNgDialogComponent,
          ButtonModule,
          CardModule,
          CommonModule,
          RouterLink
     ],
     providers: [ConfirmationService]
})


export class MainMinistriesComponent implements OnInit {

     protected readonly ministries = signal<Ministry[]>([
          {
               ministryName: 'Worship',
               description: 'Create and update worship line up and schedules',
               icon: 'fa-solid fa-music',
               route: 'worship',
          },
     ]);



     constructor(

     ) {

     }

     ngOnInit() {
     }


}
