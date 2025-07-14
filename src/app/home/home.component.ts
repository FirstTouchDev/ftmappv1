import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { PrimeIcons } from 'primeng/api';

@Component({
     selector: 'menubar-template-demo',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     standalone: true,
     imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule],
     providers: [
          PrimeIcons
     ]

})
export class HomeComponent implements OnInit {
     items: MenuItem[] | undefined;

     ngOnInit() {
          this.items = [
               {
                    label: 'Home',
                    icon: 'pi pi-home',
                    //badge: "100",
               },
               {
                    label: 'Ministries',
                    icon: 'pi pi-objects-column',
                    items: [
                         {
                              label: 'Worship',
                              icon: 'pi pi-play-circle',
                         },
                    ]
               },
          ]
     }
}