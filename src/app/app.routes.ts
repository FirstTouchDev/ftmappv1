import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MainWorshipComponent } from './ministries/main-ministries-view/main-worship/main-worship.component';
import { MainMinistriesComponent } from './ministries/main-ministries-view/main-ministries.component';
import { AuthGuard } from './root/guards/auth.guard';

export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },

     // Public routes
     { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
     { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },

     // Protected routes wrapped in a parent guarded route
     {
          path: '',
          canActivate: [AuthGuard],
          children: [
               { path: 'home', component: HomeComponent },
               { path: 'ministries', component: MainMinistriesComponent },
               { path: 'ministries/worship', component: MainWorshipComponent }
          ]
     },

     { path: '**', redirectTo: 'home' }
];
