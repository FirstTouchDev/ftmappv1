import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../root/services/firebase.service';
import { signal } from '@angular/core';
import { tap, finalize } from 'rxjs';
import { GENDERS, GenderOption, GenderList } from '../root/constants/user.model';
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
import { InputIconModule } from 'primeng/inputicon';
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

     protected agreedToDisclaimerMessage = signal<boolean>(false);
     protected isLoggingIn = signal<boolean>(false);
     protected activeStep: number = 1;

     protected firstName: string = '';
     protected middleName: string = '';
     protected lastName: string = '';
     protected selectedGender: GenderOption | null = null;
     protected genders: GenderOption[] = [...GENDERS];
     protected birthDate: Date | null = null;

     protected address: string = '';
     protected phoneNumber: number | null = null;
     protected invitedBy: string = '';
     protected emailAddress: string = '';
     protected joinDate: Date | null = null;

     protected username: string = '';
     protected password: string = '';
     protected repeatPassword: string = '';
     protected recoveryEmail: string = '';

     protected personalDataErrorCount = signal<number>(0);
     protected personalDataErrorMessage = signal<string>('Please check these following errors: ');




     constructor(
          private firebaseService: FirebaseService,
          private localStorageService: LocalStorageService,
          private formBuilder: FormBuilder,
          private messageService: MessageService,
          private confirmationService: ConfirmationService

     ) {

     }

     ngOnInit() {

     }

     public checkUserPersonalData(activateCallback: (index: number) => void) {
          const validations: { field: any; message: string }[] = [
               { field: this.firstName, message: 'First name field is required.' },
               { field: this.lastName, message: 'Last name field is required.' },
               { field: this.selectedGender, message: 'Gender field is required.' },
               { field: this.birthDate, message: 'Birthdate field is required.' },
          ];

          let errorCount = 0;
          let errorMessage = 'Please check the following errors: ';

          validations.forEach(validation => {
               if (!validation.field) {
                    errorCount++;
                    errorMessage += `${validation.message} `;
               }
          });

          this.personalDataErrorCount.set(errorCount);
          this.personalDataErrorMessage.set(errorMessage);

          console.log("personalDataErrorMessage", this.personalDataErrorMessage());
          console.log("personalDataErrorCount", this.personalDataErrorCount());

          if (errorCount === 0) {
               activateCallback(2);
          }
     }




     ngOnDestroy() {
          this.agreedToDisclaimerMessage.set(false);
     }


}
