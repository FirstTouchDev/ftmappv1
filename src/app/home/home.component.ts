import { Component, OnInit } from '@angular/core';
import { PrimeNgHeaderComponent } from '../root/shared-components/prime-ng-header/prime-ng-header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
     selector: 'home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     standalone: true,
     imports: [
          PrimeNgHeaderComponent,
          CardModule,
          ButtonModule
     ]
})
export class HomeComponent implements OnInit {

     constructor() { }

     ngOnInit() { }

}
