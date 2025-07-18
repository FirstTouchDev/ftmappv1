import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { PrimeNgProgressBar } from "./root/shared-components/prime-ng-progress-bar/prime-ng-progress-bar.component";
import { PrimeNgLoadingBar } from "./root/shared-components/prime-ng-loading-spinner/prime-ng-loading-spinner.component";
import { PrimeNgHeaderComponent } from './root/shared-components/prime-ng-header/prime-ng-header.component';
import { PrimeNgFooterComponent } from './root/shared-components/prime-ng-footer/prime-ng-footer.component';
import { signal } from '@angular/core';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileSideBarComponent } from './root/shared-components/prime-ng-footer/profile-side-bar/profile-side-bar.component';

@Component({
     selector: 'app-root',
     imports: [
          RouterOutlet, 
          ToastModule,
          MessageModule, 
          PrimeNgProgressBar,
          PrimeNgLoadingBar, 
          PrimeNgHeaderComponent, 
          PrimeNgFooterComponent,
          CommonModule,
     ],
     templateUrl: './app.component.html',
     styleUrl: './app.component.css',
     standalone: true,
     providers: [MessageService],
})
export class AppComponent {
     
     title = 'ftmapp';

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
          private router: Router
     ){
          this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
               const url = event.urlAfterRedirects;
               const showHeader = this.allowedRoutesForHeader.some(path => url.startsWith(path));
               const showFooter = this.allowedRoutesForFooter.some(path => url.startsWith(path));

               this.displayHeader.set(showHeader);
               this.displayFooter.set(showFooter);

          })
     }
}
