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
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule} from 'primeng/inputicon';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
     selector: 'signup',
     templateUrl: './signup.component.html',
     styleUrls: ['./signup.component.scss'],
     standalone: true,
     imports: [
          ConfirmDialogModule,
          CheckboxModule,
          MessageModule,
          ToastModule,
          CommonModule, 
          FormsModule, 
          FloatLabelModule,
          InputTextModule,
          PasswordModule,
          FluidModule,
          ButtonModule,
          StepperModule,
          RouterModule,
          ToggleButtonModule,
          InputIconModule,
          IconFieldModule,
          RadioButtonModule,
          DropdownModule,
          DatePickerModule,
          InputNumberModule
     ],
     providers: [MessageService, ConfirmationService]
})


export class SignUpComponent implements OnInit {

     

     private _verifiedUserAccountDocumentId: string | null = null;

     protected isLoading = signal<boolean>(false);
     protected displayEye = signal<boolean>(false);
     protected errorMessage = signal<string>('');
     protected agreedToDisclaimerMessage = signal<boolean>(false);
     phonenumber: number | null = null;
     protected username: string = '';
     protected password: string = '';
     protected isLoggingIn = signal<boolean>(false);
     genders = [
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' }
        ];

        selectedGender: any;

    
     constructor(
          private firebaseService: FirebaseService,
          private localStorageService: LocalStorageService,
          private formBuilder: FormBuilder,
          private messageService: MessageService,
          private confirmationService: ConfirmationService
          
     ) {
          this._verifiedUserAccountDocumentId = this.localStorageService.get(Key.DOCUMENTMASTERUSERID) ? this.localStorageService.get(Key.DOCUMENTMASTERUSERID) : null;
     }

     ngOnInit() {

      }

     

     activeStep: number = 1;

     
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
                         
                         // //this.ionicAlertService.presentAlert('Oops', 'User not found.');
                    }
               }),
               finalize(() => {
                    this.isLoggingIn.set(false);
               })
          ).subscribe();
     }

     confirm() {
          this.confirmationService.confirm({
              header: 'Info',
              message: 'An email will be sent to you once the account is ready to use.',
              accept: () => {
                  //this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
              },
              reject: () => {
                  //this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
              },
          });
      }

     ngOnDestroy(){
          this.agreedToDisclaimerMessage.set(false);
     }


}
