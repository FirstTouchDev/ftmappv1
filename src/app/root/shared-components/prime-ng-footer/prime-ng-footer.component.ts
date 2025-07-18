import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { Router, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { PopoverModule } from 'primeng/popover';
import { ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { StyleClass } from 'primeng/styleclass';
import { DrawerModule } from 'primeng/drawer';
import { Drawer } from 'primeng/drawer';
import { ProfileSideBarService } from './profile-side-bar/profile-side-bar.service';

@Component({
     selector: 'prime-ng-footer',
     templateUrl: './prime-ng-footer.component.html',
     styleUrls: ['./prime-ng-footer.component.scss'],
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
          CardModule,
          SidebarModule,
          StyleClassModule,
          DrawerModule,
     ],
     providers: [PrimeIcons]
})
export class PrimeNgFooterComponent implements OnInit {

     protected navItems: { label: string; icon: string; route: string }[] = [];

     constructor(
          protected router: Router,
          private profileSideBarService: ProfileSideBarService
     ) { }

     ngOnInit(): void {
          this.navItems = [
               { label: 'Home', icon: 'fa-solid fa-house', route: '/home' },
               { label: 'Ministries', icon: 'fa-solid fa-rectangle-list', route: '/ministries' },
               { label: 'News', icon: 'fa-solid fa-envelope', route: '/news' },
               { label: 'Profile', icon: 'fa-solid fa-user', route: '/profile' }
          ];
     }

     public isActive(route: string): boolean {
          return this.router.url.startsWith(route)
     }

     public reRoute(route: string): void {
          if (route === '/profile'){
               this.profileSideBarService.showProfileSideBar();
               return;
          }
          this.router.navigateByUrl(route);
     }
}
