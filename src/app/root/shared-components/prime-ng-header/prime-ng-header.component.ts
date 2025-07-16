import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { PrimeIcons } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { Popover } from 'primeng/popover';
import { ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
     selector: 'prime-ng-header',
     templateUrl: './prime-ng-header.component.html',
     styleUrls: ['./prime-ng-header.component.scss'],
     standalone: true,
     imports: [
          MenubarModule, 
          BadgeModule, 
          AvatarModule, 
          InputTextModule,
          CommonModule, 
          RouterModule, 
          PopoverModule,
          ButtonModule,
          CardModule
     ],
     providers: [
          PrimeIcons
     ]

})
export class PrimeNgHeaderComponent implements OnInit {


     ngOnInit() {

     }

}