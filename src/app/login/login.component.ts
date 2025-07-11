import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../root/services/firebase.service';
import { signal } from '@angular/core';
import { tap, finalize } from 'rxjs';
import { User, UserAccounts } from '../root/constants/user.model';
import { Collection } from '../root/constants/firebase';
import { LocalStorageService } from '../root/services/local-storage.service';
import { Key } from '../root/constants/local-storage';
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
import { RouterModule } from '@angular/router';


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
     providers: [MessageService]
})

export class LoginComponent implements OnInit {

     private _verifiedUserAccountDocumentId: string | null = null;

     protected isLoading = signal<boolean>(false);
     protected displayEye = signal<boolean>(false);
     protected errorMessage = signal<string>('');

     protected username: string = '';
     protected password: string = '';
     protected isLoggingIn = signal<boolean>(false);

     constructor(
          private firebaseService: FirebaseService,
          private localStorageService: LocalStorageService,
          private formBuilder: FormBuilder,
          private messageService: MessageService
          
     ) {
          this._verifiedUserAccountDocumentId = this.localStorageService.get(Key.DOCUMENTMASTERUSERID) ? this.localStorageService.get(Key.DOCUMENTMASTERUSERID) : null;
     }

     ngOnInit() { }

     
     public onLogin(){
          this.isLoggingIn.set(true);
          this.firebaseService.adminVerifyUserCredentials$(this.username, this.password).pipe(
               tap((userAccountDocumentId) => {
                    if (userAccountDocumentId){
                         this._verifiedUserAccountDocumentId = userAccountDocumentId;                         
                         this.localStorageService.set(Key.DOCUMENTMASTERUSERID, this._verifiedUserAccountDocumentId);
                         this.errorMessage.set("");
                         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Welcome back!' });
                    } 
                    else {    
                         this.errorMessage.set("Invalid username or password!");
                    }
               }),
               finalize(() => {
                    this.isLoggingIn.set(false);
               })
          ).subscribe();
     }



     protected test(): void {
          this.isLoading.set(true);
          const user: User = {
               id: 'test',
               name: 'hello',
               email: 'secret',
               createdAt: new Date(),
               updatedAt: new Date(),
          }
          this.firebaseService.adminAddData$(Collection.USERS, user).pipe(
               finalize(() => {
                    this.isLoading.set(false);
               })
          ).subscribe();
     }

     protected addUserAccount(): void {
          this.isLoading.set(true);
          const user = new UserAccounts ({
               username: 'superuser',
               password: '123',
               isSuperUser: true
          });
          this.firebaseService.adminAddData$(Collection.USERACCOUNTS, user.toJson()).pipe(
               finalize(() => {
                    this.isLoading.set(false);
               })
          ).subscribe();
     }

     protected getData(): void{
          this.isLoading.set(true);
          const userId = 'pWMjAo8IQwO71n8uNnqj';
          this.firebaseService.adminGetData$(Collection.USERS, userId).pipe(
               tap((res) => {
                    console.log('res', res);
               }),
               finalize(() => {
                    this.isLoading.set(false);
               })
          ).subscribe();
     }

     protected verifyUser(): void {
          this.isLoading.set(true);
          this.firebaseService.adminVerifyUserCredentials$('superuser', 'lisud').pipe(
               tap((userAccountDocumentId) => {
                    if (userAccountDocumentId){
                         this._verifiedUserAccountDocumentId = userAccountDocumentId;
                         this.localStorageService.set(Key.DOCUMENTMASTERUSERID, this._verifiedUserAccountDocumentId);
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
