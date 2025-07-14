import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MainGuard } from './root/guards/main.guard';
import { LoginRedirectGuard } from './root/guards/login-redirect.guard';
import { MainWorshipComponent } from './ministries/main-worship/main-worship.component';


export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path: 'login', component: LoginComponent },
     { path: 'signup', component: SignUpComponent },
     { path: 'home', component: HomeComponent },
     { path: 'worship', component: MainWorshipComponent },
];
