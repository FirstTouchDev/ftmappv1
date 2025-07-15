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
import { MessageModule } from 'primeng/message';
import { Router, RouterModule } from '@angular/router';
import { switchMap, EMPTY, catchError, of } from 'rxjs';
import { AuthService } from '../root/services/auth.service';
import { PrimeNgProgressBarService } from '../root/shared-components/prime-ng-progress-bar/prime-ng-progress-bar.service';
import { CurrentLoggedInUserService } from '../root/services/current-logged-in-user.service';


@Component({
     selector: 'login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.scss'],
     standalone: true,
     imports: [
          FloatLabelModule,
          FluidModule,
          MessageModule,
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

     private _verifiedUserAccountDocumentId: string | null = null;

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
          private currentLoggedInUserService: CurrentLoggedInUserService   ,
          
     ) {
          this._verifiedUserAccountDocumentId = this.localStorageService.get(LocalStorageKey.DOCUMENTMASTERUSERID) ? this.localStorageService.get(LocalStorageKey.DOCUMENTMASTERUSERID) : null;
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
                    return this.firebaseService.adminGetData$<UserAccount>(Collection.USERACCOUNTS, userAccountDocumentId);
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
                         return this.firebaseService.adminGetDataByField$<User>(
                              Collection.USERS,
                              Field.USERACCOUNTID,
                              this._verifiedUserAccountDocumentId
                         );
                    }
     
                    return EMPTY;
               }),
               tap((user) => {
                    if (!user) return;
                    this.currentLoggedInUserService.setUserId(user.id!);
                    this.localStorageService.set(LocalStorageKey.USERDATA, user);
                    this.authService.login();
                    this.router.navigate(['/home']);
                    this.messageService.add({
                         severity: 'success',
                         summary: 'Login Successful!',
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
     

     protected verifyUser(): void {
          this.isLoading.set(true);
          this.firebaseService.adminVerifyUserCredentials$('superuser', 'lisud').pipe(
               tap((userAccountDocumentId) => {
                    if (userAccountDocumentId){
                         this._verifiedUserAccountDocumentId = userAccountDocumentId;
                         this.localStorageService.set(LocalStorageKey.DOCUMENTMASTERUSERID, this._verifiedUserAccountDocumentId);
                    } 
                    else {
                         //this.ionicAlertService.presentAlert('Oops', 'User not found.');
                    }
               }),
               finalize(() => {
                    this.isLoading.set(false);
               })
          ).subscribe();
     }

     protected updateUser(): void {
          this.isLoading.set(true);
          const partialUpdate = {
               password: 'lisud',
             };
          this.firebaseService.adminUpdateData$(Collection.USERACCOUNTS, this._verifiedUserAccountDocumentId + '123' || '', partialUpdate).pipe(
               tap((response) => {
                    console.log(response);
               }),
               finalize(() => {
                    this.isLoading.set(false);
               })
          ).subscribe();
     }

     protected deleteData(): void {
          this.isLoading.set(true);
          this.firebaseService.adminDeleteData$(Collection.USERACCOUNTS, 'kW9eaWhMNUVw2mkq6j5l').pipe(
               tap((res) => {
                    console.log('res', res);
               }),
               finalize(() => {
                    this.isLoading.set(false);
               })
          ).subscribe();
     }


}
