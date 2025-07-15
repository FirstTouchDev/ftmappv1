import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PrimeNgFooterComponent } from '../root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { PrimeNgHeaderComponent } from '../root/shared-components/prime-ng-header/prime-ng-header.component';

@Component({
     selector: 'home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     standalone: true,
     imports: [
          PrimeNgHeaderComponent,
          CardModule,
          ButtonModule,
          PrimeNgFooterComponent
     ]
})
export class HomeComponent implements OnInit {

     constructor() { }

     ngOnInit() { }

}
