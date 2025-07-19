import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../root/services/firebase.service';
import { signal } from '@angular/core';
import { tap, finalize, debounce, debounceTime } from 'rxjs';
import { UserAccount } from '../root/models/user-account.model';
import { User } from '../root/models/user.model';
import { ApprovalStatus, Collection, Field } from '../root/constants/firebase';
import { LocalStorageService } from '../root/services/local-storage.service';
import { LocalStorageKey } from '../root/constants/local-storage';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { switchMap, EMPTY, catchError, of } from 'rxjs';
import { AuthService } from '../root/services/auth.service';
import { PrimeNgProgressBarService } from '../root/shared-components/prime-ng-progress-bar/prime-ng-progress-bar.service';


@Component({
     selector: 'login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.scss'],
     standalone: true,
     imports: [
          FloatLabelModule,
          FluidModule,
          ToastModule,
          CommonModule, 
          FormsModule, 
          InputTextModule,
          PasswordModule,
          ButtonModule,
          RouterModule
     ],
})

export class LoginComponent implements OnInit {

     private _verifiedUserAccountDocumentId: string = ''

     protected isLoading = signal<boolean>(false);
     protected displayEye = signal<boolean>(false);

     protected username: string = '';
     protected password: string = '';

     constructor(
          private firebaseService: FirebaseService,
          private localStorageService: LocalStorageService,
          private formBuilder: FormBuilder,
          private messageService: MessageService,
          private router: Router,
          private authService: AuthService,
          private primeNgProgressBarService: PrimeNgProgressBarService,
          
     ) {
          if (this.localStorageService.get(LocalStorageKey.DOCUMENTMASTERUSERID)){
               this._verifiedUserAccountDocumentId = this.localStorageService.get(LocalStorageKey.DOCUMENTMASTERUSERID);
          }
     }

     ngOnInit() { }

     
     public onLogin(): void {
          this.primeNgProgressBarService.show();
          this.firebaseService.adminVerifyUserCredentials$(this.username, this.password).pipe(
               switchMap((userAccountDocumentId) => {
                    if (!userAccountDocumentId) {
                         this.messageService.add({
                              severity: 'error',
                              summary: 'Login Failed!',
                              detail: 'Invalid username or password.',
                         });
                         return EMPTY;
                    }
     
                    this._verifiedUserAccountDocumentId = userAccountDocumentId;
                    return this.firebaseService.adminGetSingleData$<UserAccount>(Collection.USERACCOUNTS, userAccountDocumentId);
               }),
               switchMap((userAccount) => {
                    if (!userAccount) return EMPTY;
     
                    if (userAccount.status === ApprovalStatus.WATINGFORAPPROVAL) {
                         this.messageService.add({
                              severity: 'info',
                              summary: 'Info',
                              detail: 'Your account is still in approval process. Thank you for your patience!',
                         });
                         return EMPTY;
                    }
     
                    if (userAccount.status === ApprovalStatus.APPROVED) {
                         this.localStorageService.set(LocalStorageKey.DOCUMENTMASTERUSERID, this._verifiedUserAccountDocumentId);
                         return this.firebaseService.adminGetDataByFieldAndValue$<User>(Collection.USERS, Field.USERACCOUNTID, this._verifiedUserAccountDocumentId);
                    }
     
                    return EMPTY;
               }),
               tap((user) => {
                    if (!user || !user.id) return;

                    const updateLoggedInStatus  = { isLoggedIn: true };
                    this.firebaseService.adminUpdateData$(Collection.USERS, user.id, updateLoggedInStatus);
                    this.localStorageService.set(LocalStorageKey.USERDATA, user);
                    this.authService.login();
                    this.router.navigate(['/home']);
                    this.messageService.add({
                         severity: 'success',
                         summary: 'Success',
                         detail: 'Welcome back.',
                    });
                   
               }),
               catchError(() => {
                    this.messageService.add({
                         severity: 'error',
                         summary: 'Login Error',
                         detail: 'Something went wrong. Please try again later.',
                    });
                    return of(null);
               }),
               finalize(() => {
                    this.primeNgProgressBarService.hide();
               })
          ).subscribe();
     }

}
