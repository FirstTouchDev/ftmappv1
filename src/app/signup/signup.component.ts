import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../root/services/firebase.service';
import { signal } from '@angular/core';
import { tap, finalize, of, catchError, switchMap, EMPTY } from 'rxjs';
import { GENDERS, GenderOption, GenderList, GenderValue } from '../root/constants/gender';
import { Collection, Field } from '../root/constants/firebase';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Router, RouterModule } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomValidatorsService } from '../root/services/custom-validators.service';
import { ViewChild } from '@angular/core';
import { PrimeNgDialogComponent } from '../root/shared-components/prime-ng-dialog/prime-ng-dialog.component';
import { User } from '../root/models/user.model';
import { UserAccount } from '../root/models/user-account.model';
import { PrimeNgProgressBarService } from '../root/shared-components/prime-ng-progress-bar/prime-ng-progress-bar.service';

@Component({
     selector: 'signup',
     templateUrl: './signup.component.html',
     styleUrls: ['./signup.component.scss'],
     standalone: true,
     imports: [
          ConfirmDialogModule,
          CheckboxModule,
          ReactiveFormsModule,
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
          InputNumberModule,
          PrimeNgDialogComponent
     ],
     providers: [MessageService, ConfirmationService, CustomValidatorsService]
})


export class SignUpComponent implements OnInit {

     @ViewChild('primeNgDialog') primeNgDialog!: PrimeNgDialogComponent;

     protected agreedToDisclaimerMessage = signal<boolean>(false);
     protected activeStep: number = 1;

     protected genders: GenderOption[] = [...GENDERS];

     protected personalDataForm: FormGroup;
     protected otherDataForm: FormGroup;
     protected accountDataForm: FormGroup;

     private isPersonalDataFormSubmitted: boolean = false;
     private isOtherDataFormSubmitted: boolean = false;
     private isAccountDataFormSubmitted: boolean = false;

     protected customPasswordErrorMessage = signal<string>('');
     protected customeUsernameErrorMessage = signal<string>('');



     constructor(
          private formBuilder: FormBuilder,
          private firebaseService: FirebaseService,
          private messageService: MessageService,
          private router: Router,
          private primeNgProgressBarService: PrimeNgProgressBarService
     ) {
          this.personalDataForm = this.formBuilder.group({
               firstName: ['', Validators.required],
               middleName: [''],
               lastName: ['', Validators.required],
               gender: [null, Validators.required],
               birthDate: [null, Validators.required],
          });

          this.otherDataForm = this.formBuilder.group({
               address: ['', Validators.required],
               phoneNumber: [null],
               invitedBy: [''],
               emailAddress: ['', [Validators.required, Validators.email]],
               joinDate: [null],
          });

          this.accountDataForm = this.formBuilder.group({
               username: ['', Validators.required],
               password: ['', Validators.required],
               repeatPassword: ['', Validators.required],
               recoveryEmail: ['', [Validators.required, Validators.email]],
          });
     }

     ngOnInit() {

     }

     public onSubmitPersonalDataForm(activateCallback: (index: number) => void): void {
          this.isPersonalDataFormSubmitted = true;
          if (this.personalDataForm.valid) {
               activateCallback(2);
               this.isPersonalDataFormSubmitted = false;
          }
     }

     public onSubmitOtherDataForm(activateCallback: (index: number) => void): void {
          this.isOtherDataFormSubmitted = true;
          if (this.otherDataForm.valid) {
               activateCallback(3);
               this.isOtherDataFormSubmitted = false;
          }
     }





     public onSubmitAccountDataForm(activateCallback: (index: number) => void): void {
          this.isAccountDataFormSubmitted = true;
          if (this.accountDataForm.valid) {

               const firstName: string = this.personalDataForm.get('firstName')?.value;
               const middleName: string = this.personalDataForm.get('middleName')?.value;
               const lastName: string = this.personalDataForm.get('lastName')?.value;
               const gender: GenderValue = this.personalDataForm.get('gender')?.value;
               const birthDate: Date = this.personalDataForm.get('birthDate')?.value;
               
               const address: string =  this.otherDataForm.get('address')?.value;
               const phoneNumber: string = this.otherDataForm.get('phoneNumber')?.value;
               const invitedBy: string = this.otherDataForm.get('invitedBy')?.value;
               const emailAddress: string = this.otherDataForm.get('emailAddress')?.value;
               const joinDate: Date = this.otherDataForm.get('joinDate')?.value;

               const username: string = this.accountDataForm.get('username')?.value;
               const password: string = this.accountDataForm.get('password')?.value;
               const repeatPassword: string = this.accountDataForm.get('repeatPassword')?.value;
               const recoveryEmail: string = this.accountDataForm.get('recoveryEmail')?.value;

               // if (password !== repeatPassword){
               //      this.customPasswordErrorMessage.set("Passwords do not match.");
               //      return;
               // }

               // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
               // if (!passwordRegex.test(password || repeatPassword)){
               //      this.customPasswordErrorMessage.set("Password must be at least 8 characters and include letters, numbers, and special characters.");
               //      return;
               // }


               this.primeNgProgressBarService.show();
               this.firebaseService.adminCheckDoesDataExist$(Collection.USERACCOUNTS, Field.USERNAME, username).pipe(
                    switchMap(exists => {
                         if (exists) {
                              this.customeUsernameErrorMessage.set("Sorry, the username is already taken.");
                              return EMPTY;
                         }
                         const userAccount = new UserAccount ({
                              username: username,
                              password: password,
                              recoveryEmail: recoveryEmail,
                         });

                         return this.firebaseService.adminAddData$(Collection.USERACCOUNTS, userAccount.toJson());
                    }),
                    switchMap((userAccountId: string) => {
                         const user = new User({
                              userAccountId: userAccountId,
                              firstName: firstName,
                              middleName: middleName,
                              lastName: lastName,
                              birthDate: birthDate,
                              gender: gender,
                              emailAddress: emailAddress,
                              address: address,
                              phoneNumber: phoneNumber,
                              invitedBy: invitedBy,
                              joinDate: joinDate,
                         })

                         return this.firebaseService.adminAddData$(Collection.USERS, user.toJson());
                    }),
                    tap(() => {
                         this._showAccountCreatedSuccessfullyDialog();
                    }),
                    catchError(()=> {
                         this.messageService.add({ 
                              severity: 'error', 
                              summary: 'Error', 
                              detail: 'Something went wrong. Please try again later.' 
                         });
                         return of(null)
                    }),
                    finalize(() => {
                         this.primeNgProgressBarService.hide();
                    })
               ).subscribe();


          }
     }

     public isInvalid(controlName: string, formGroup: FormGroup) {
          const control = formGroup.get(controlName);
          return control?.invalid && (control.touched || this.isPersonalDataFormSubmitted || this.isOtherDataFormSubmitted || this.isAccountDataFormSubmitted);
     }

     private _showAccountCreatedSuccessfullyDialog(): void {
          this.primeNgDialog.show({
               header: 'Success',
               message: 'The account was successfully created! An email will be sent to you once the account is ready.',
               icon: 'fa-solid',
               iconColorToken: 'primary-contrast',
          iconBgColorToken: 'primary',
               buttons: [
                    {
                         label: 'OK',
                         action: () => this.router.navigate(['/login']),
                         styleClass: 'p-button-primary',
                    },
               ],
          });
     }

     ngOnDestroy() {
          this.agreedToDisclaimerMessage.set(false);
     }


}
