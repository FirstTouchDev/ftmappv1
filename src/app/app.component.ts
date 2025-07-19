import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PrimeNgProgressBar } from "./root/shared-components/prime-ng-progress-bar/prime-ng-progress-bar.component";
import { PrimeNgLoadingBar } from "./root/shared-components/prime-ng-loading-spinner/prime-ng-loading-spinner.component";
import { PrimeNgHeaderComponent } from './root/shared-components/prime-ng-header/prime-ng-header.component';
import { PrimeNgFooterComponent } from './root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { signal } from '@angular/core';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileSideBarComponent } from './root/shared-components/prime-ng-footer/profile-side-bar/profile-side-bar.component';
import { PrimeNgDialogComponent } from './root/shared-components/prime-ng-dialog/prime-ng-dialog.component';
import { ViewChild } from '@angular/core';
import { ConfirmDialogService } from './root/services/confirm-dialog.service';
import { LocalStorageService } from './root/services/local-storage.service';
import { LocalStorageKey } from './root/constants/local-storage';

@Component({
     selector: 'app-root',
     imports: [
          RouterOutlet, 
          ToastModule, 
          PrimeNgProgressBar,
          PrimeNgLoadingBar, 
          PrimeNgHeaderComponent, 
          PrimeNgFooterComponent,
          CommonModule,
          PrimeNgDialogComponent
     ],
     templateUrl: './app.component.html',
     styleUrl: './app.component.css',
     standalone: true,
     providers: [],
})
export class AppComponent {
     
     title = 'ftmapp';

     @ViewChild('globalDialog') dialog!: PrimeNgDialogComponent;
     protected displayHeader = signal<boolean>(false);
     protected displayFooter = signal<boolean>(false);

     private allowedRoutesForHeader = [
          '/home',
          '/ministries',
          '/ministries/worship'
     ]

     private allowedRoutesForFooter = [
          '/home',
          '/ministries',
          '/ministries/worship'
     ]

     constructor(
          private router: Router,
          private confirmDialogService: ConfirmDialogService,
          private localStorageService: LocalStorageService
     ){
          this._setViewMode();
          this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
               const url = event.urlAfterRedirects;
               const showHeader = this.allowedRoutesForHeader.some(path => url.startsWith(path));
               const showFooter = this.allowedRoutesForFooter.some(path => url.startsWith(path));

               this.displayHeader.set(showHeader);
               this.displayFooter.set(showFooter);

          });
     }

     ngAfterViewInit() {
          this.confirmDialogService.register(this.dialog);
     }

     private _setViewMode(){
          const isDarkMode: boolean = this.localStorageService.get(LocalStorageKey.ISDARKMODE);
          if (isDarkMode) {
               document.documentElement.classList.toggle('dark-mode');
               document.documentElement.classList.contains('dark-mode');
          }

     }
}
