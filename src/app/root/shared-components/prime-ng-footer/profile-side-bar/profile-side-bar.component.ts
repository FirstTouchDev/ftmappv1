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
import { ToastModule } from 'primeng/toast';
import { PrimeNgDialogComponent } from "../../prime-ng-dialog/prime-ng-dialog.component";
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { FirebaseService } from '../../../services/firebase.service';
import { PrimeNgLoadingSpinnerService } from '../../prime-ng-loading-spinner/prime-ng-loading-spinner.service';
import { Collection } from '../../../constants/firebase';
import { PrimeNgProgressBarService } from '../../prime-ng-progress-bar/prime-ng-progress-bar.service';
import { finalize, tap } from 'rxjs';
import { AccordionModule } from 'primeng/accordion';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Theme, ThemeService } from '@primeuix/themes';
import { inject } from '@angular/core';

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
          ToastModule,
          DrawerModule,
          RippleModule,
          AccordionModule,
          ToggleSwitchModule,
          FormsModule,
     ],
     providers: [PrimeIcons]
})
export class ProfileSideBarComponent implements OnInit {

     @ViewChild('drawerRef') drawerRef!: Drawer;
     //@ViewChild('primeNgDialog') primeNgDialog!: PrimeNgDialogComponent;

     protected sidebarVisible: boolean = false;
     protected userData = signal<User | null>(null);

     // Settings
     protected isDarkMode: boolean = false;

     constructor(
          protected router: Router,
          private profileSideBarService: ProfileSideBarService,
          private dataRetrievalService: DataRetrievalService,
          private localStorageService: LocalStorageService,
          private authService: AuthService,
          private messageService: MessageService,
          private confirmDialogService: ConfirmDialogService,
          private firebaseService: FirebaseService,
          private primeNgProgressBarService: PrimeNgProgressBarService, 
          //private themeService: ThemeService
     ) {

          this.isDarkMode = this.localStorageService.get(LocalStorageKey.ISDARKMODE);
      }

     ngOnInit(): void {
          this.profileSideBarService.visible$.subscribe(visible => {
               this.sidebarVisible = visible;
          })


     }

     ngAfterViewInit() {
          this.userData.set(this.dataRetrievalService.getData<User>(LocalStorageKey.USERDATA));
     }

     closeCallback(e?: Event): void {
          const event = e ?? new Event('close');
     
          event.preventDefault();
          this.drawerRef.close(event);
     }

     public confrimUserLogout(): void {
          this._showAccountCreatedSuccessfullyDialog();
     }

     private _showAccountCreatedSuccessfullyDialog(): void {
          this.confirmDialogService.show({
               header: 'Confirm',
               message: 'Are you sure you want to logout?',
               icon: 'fa-solid fa-question',
               iconColorToken: 'primary-contrast',
               iconBgColorToken: 'primary',
               buttons: [

                    {
                         label: 'No',
                         action: () => this.confirmDialogService.dismiss(),
                         styleClass: 'p-button-secondary p-button-outlined',
                    },
                    {
                         label: 'Yes',
                         action: () => this.logoutUser(),
                         styleClass: 'p-button-primary',
                    },
               ],
          });
     }

     private logoutUser(): void {
          const user = this.userData();
          if (!user || !user.id) {
               this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Operation failed, no user currently logged in!',
               })
               return;
          }
          this.primeNgProgressBarService.show();

          const updateLoggedInStatus = { isLoggedIn: false };

          this.firebaseService.adminUpdateData$(Collection.USERS, user.id, updateLoggedInStatus).pipe(
               finalize(() => {
                    this.primeNgProgressBarService.hide();
               })
          ).subscribe({
               next: () => {
                    this.confirmDialogService.dismiss();
                    this.messageService.add({
                         severity: 'success',
                         summary: 'Success',
                         detail: 'You are logged out successfully!',
                    });

                    this.closeCallback();
                    this.authService.logout();
                    this.localStorageService.clear();
                    this.router.navigate(['/login']);
               },
               error: (err) => {
                    this.messageService.add({
                         severity: 'error',
                         summary: 'Error',
                         detail: 'Logout failed. Please try again.',
                    });
               }
          });


     }

     public updateViewMode(): void {
          document.documentElement.classList.toggle('dark-mode');
          this.isDarkMode = document.documentElement.classList.contains('dark-mode');
          this.localStorageService.set(LocalStorageKey.ISDARKMODE, this.isDarkMode);
     }

}
