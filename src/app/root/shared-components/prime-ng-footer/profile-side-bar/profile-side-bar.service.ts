import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentInjectorService } from '../../../services/component-injector.service';
import { ProfileSideBarComponent } from './profile-side-bar.component';

@Injectable(
     { providedIn: 'root' }
)

export class ProfileSideBarService {
     private _visible$ = new BehaviorSubject<boolean>(false);
     visible$ = this._visible$.asObservable();

     private hasLoadedComponent = false;

     constructor(private componentInjectorService: ComponentInjectorService) {}

     public showProfileSideBar(): void {
          if (!this.hasLoadedComponent) {
               this.componentInjectorService.appendComponent(ProfileSideBarComponent);
               this.hasLoadedComponent = true;
          }

          this._visible$.next(true);
     }

     public dismissSideBar(): void {
          this._visible$.next(false);
     }
}
