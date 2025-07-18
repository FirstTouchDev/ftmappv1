import { Component, OnInit, signal } from '@angular/core';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
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
import { ProfileSideBarService } from './profile-side-bar.service';
import { User } from '../../../models/user.model';
import { DataRetrievalService } from '../../../services/data-retrieval.service';
import { LocalStorageKey } from '../../../constants/local-storage';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthService } from '../../../services/auth.service';
import { ComponentInjectorService } from '../../../services/component-injector.service';

@Component({
     selector: 'profile-side-bar',
     templateUrl: './profile-side-bar.component.html',
     styleUrls: ['./profile-side-bar.component.scss'],
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
          RippleModule
     ],
     providers: [PrimeIcons, MessageService]
})
export class ProfileSideBarComponent implements OnInit {

     @ViewChild('drawerRef') drawerRef!: Drawer;

     protected sidebarVisible: boolean = false;
     protected userData = signal<User | null>(null);

     constructor(
          protected router: Router,
          private profileSideBarService: ProfileSideBarService,
          private dataRetrievalService: DataRetrievalService,
          private localStorageService: LocalStorageService,
          private authService: AuthService,
          private messageService: MessageService,
     ) { }

     ngOnInit(): void {
          this.profileSideBarService.visible$.subscribe(visible => {
               this.sidebarVisible = visible;
          })


     }

     ngAfterViewInit() {
          this.userData.set(this.dataRetrievalService.getData<User>(LocalStorageKey.USERDATA));
     }

     closeCallback(e: any): void {
          this.drawerRef.close(e);
     }

     public onLogoutUser(): void {
          this.closeCallback(event);
          this.authService.logout();
          this.localStorageService.clear();
          this.router.navigate(['/login']);
          this.messageService.add({
               severity: 'success',
               summary: 'Success',
               detail: 'You are logged out successfully!',
          });
     }

}
