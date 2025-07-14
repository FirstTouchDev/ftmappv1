import { Component, OnInit, signal } from '@angular/core';
import { PrimeNgHeaderComponent } from '../../root/shared-components/prime-ng-header/prime-ng-header.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { GenderOption, GENDERS } from '../../root/constants/gender';
import { DropdownModule } from 'primeng/dropdown';
import { ServiceTypeOption, SERVICETYPES } from '../../root/constants/service';
import { CommonModule } from '@angular/common';
import { FormArray } from '@angular/forms';
import { FirebaseService } from '../../root/services/firebase.service';
import { Collection, Field } from '../../root/constants/firebase';
import { tap } from 'rxjs';
import { User } from '../../root/models/user.model';
import { SelectModule } from 'primeng/select';
import { TruncatePipe } from '../../root/pipes/truncate.pipe';
import { MessageModule } from 'primeng/message';

@Component({
     selector: 'main-worship',
     templateUrl: './main-worship.component.html',
     styleUrls: ['./main-worship.component.scss'],
     standalone: true,
     imports: [
          PrimeNgHeaderComponent,
          PanelModule,
          DialogModule,
          ButtonModule,
          InputTextModule,
          ReactiveFormsModule,
          FloatLabelModule,
          DatePickerModule,
          DropdownModule,
          SelectModule,
          MessageModule,
          CommonModule,
          TruncatePipe
     ]
})
export class MainWorshipComponent implements OnInit {

     protected lineUpDataForm: FormGroup;
     protected visible = signal<boolean>(false);

     protected services = signal<ServiceTypeOption[]>([...SERVICETYPES]);
     protected singerOptions = signal<User[]>([]);

     protected viewIndex = signal<number>(0);

     protected worshipDateErrorMessage = signal<string>('');
     protected worshipServiceTypeErrorMessage = signal<string>('');
     

     constructor(
          private formBuilder: FormBuilder,
          private firebaseService: FirebaseService
     ) {

          this.lineUpDataForm = this.formBuilder.group({
               worshipDate: [null, Validators.required],
               serviceType: [null, Validators.required],
               singers: this.formBuilder.array([])
          });

          this.firebaseService.adminGetAllByArrayFieldContains$<User>(Collection.USERS, Field.ROLES, 'singer').pipe(
               tap((users: User[]) => {
                    this.singerOptions.set(users);
                    console.log("singer options", this.singerOptions);
               })
          ).subscribe();

     }

     

     ngOnInit() { 
          this.setNumberOfSingersDefault();
     }
     
     public moveViewIndex(index: number){

          let hasError = false;

          if (index === 1){
               const worshipDate: string = this.lineUpDataForm.get('worshipDate')?.value;
               const serviceType: string = this.lineUpDataForm.get('serviceType')?.value;

               // if (!worshipDate) {
               //      hasError = true;
               //      this.worshipDateErrorMessage.set("Please select a date.");
               // }

               // else {
               //      this.worshipDateErrorMessage.set(""); 
               // }

               // if (!serviceType) {
               //      hasError = true;
               //      this.worshipServiceTypeErrorMessage.set("Please select a service type.");
               // }

               // else {
               //      this.worshipServiceTypeErrorMessage.set(""); 
               // }
          }


          else if (index === 2) {
               const singers = this.lineUpDataForm.get('singers')?.value;
               console.log(singers);

          }
          if (!hasError) this.viewIndex.set(index);
     }

     protected get singers(): FormArray {
          return this.lineUpDataForm.get('singers') as FormArray;
     }

     protected get singersControls(): FormControl[] {
          return this.singers.controls as FormControl[];
     }
     
     protected addSinger(): void {
          this.singers.push(this.formBuilder.control(null, Validators.required));
     }

     protected removeSinger(index: number): void {
          this.singers.removeAt(index);
     }

     private setNumberOfSingersDefault(): void {          
          for (let i = 0; i < 1; i++) {
               this.addSinger();
          }
     }

     onSubmitLineUpDataForm() {

     }

     

     protected showDialog(): void {
          this.visible.set(true);
     }

}
