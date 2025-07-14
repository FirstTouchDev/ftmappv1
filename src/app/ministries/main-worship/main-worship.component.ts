import { Component, Input, OnInit, signal } from '@angular/core';
import { PrimeNgHeaderComponent } from '../../root/shared-components/prime-ng-header/prime-ng-header.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GenderOption, GENDERS } from '../../root/constants/gender';
import { DropdownModule } from 'primeng/dropdown';
import { ServiceTypeOption, SERVICETYPES } from '../../root/constants/service';
import { CommonModule } from '@angular/common';
import { FormArray } from '@angular/forms';
import { FirebaseService } from '../../root/services/firebase.service';
import { Collection, Field, Roles } from '../../root/constants/firebase';
import { tap } from 'rxjs';
import { User } from '../../root/models/user.model';
import { SelectModule } from 'primeng/select';
import { TruncatePipe } from '../../root/pipes/truncate.pipe';
import { MessageModule } from 'primeng/message';
import { InputIconModule } from 'primeng/inputicon';
import { TextareaModule } from 'primeng/textarea';
import { IconFieldModule } from 'primeng/iconfield';
import { DatePickerModule } from 'primeng/datepicker';
import { PrimeNgDialogComponent } from '../../root/shared-components/prime-ng-dialog/prime-ng-dialog.component';
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';


@Component({
     selector: 'main-worship',
     templateUrl: './main-worship.component.html',
     styleUrls: ['./main-worship.component.scss'],
     standalone: true,
     imports: [
          InputIconModule,
          IconFieldModule,
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
          TruncatePipe,
          TextareaModule,
          PrimeNgDialogComponent
     ],
     providers: [ConfirmationService]
})
export class MainWorshipComponent implements OnInit {

     @ViewChild('primeNgDialog') primeNgDialog!: PrimeNgDialogComponent;

     protected lineUpDataForm: FormGroup;
     protected visible = signal<boolean>(false);

     protected services = signal<ServiceTypeOption[]>([...SERVICETYPES]);

     protected viewIndex = signal<number>(0);

     private masterUsers: User[] = [];
     private _singerOptions: User[] = [];
     protected drummerOptions = signal<User[]>([]);
     protected bassistOptions = signal<User[]>([]);
     protected guitaristOptions = signal<User[]>([]);
     protected keyboardOptions = signal<User[]>([]);

     protected singersSelected = signal<User[]>([]);
     

     constructor(
          private formBuilder: FormBuilder,
          private firebaseService: FirebaseService,
     ) {

          this.lineUpDataForm = this.formBuilder.group({
               worshipDate: [null, Validators.required],
               serviceType: [null, Validators.required],
               singers: this.formBuilder.array([]),
               drummer: [null],
               bassist: [null],
               electricGuitarist1: [null],
               electricGuitarist2: [null],
               acousticGuitarist: [null],
               keyboardist1: [null],
               keyboardist2: [null],
               songTitle:this.formBuilder.array([]),
               songArtist:this.formBuilder.array([]),
               songLink:this.formBuilder.array([]),
               songAssignedSinger:this.formBuilder.array([]),
               practiceDateTime: [null],
               practiceNotes: [''],
          });

          this.firebaseService.adminGetAllData$<User>(Collection.USERS).pipe(
               tap((users: User[]) => {
                    this._singerOptions = users.filter(user => user.roles?.includes(Roles.SINGER));
                    this.drummerOptions.set(users.filter(user => user.roles?.includes(Roles.DRUMMER)));
                    this.bassistOptions.set(users.filter(user => user.roles?.includes(Roles.BASSIST)));
                    this.guitaristOptions.set(users.filter(user => user.roles?.includes(Roles.GUITARIST)));
                    this.keyboardOptions.set(users.filter(user => user.roles?.includes(Roles.KEYBOARDIST)));
                    
               })
          ).subscribe();

     }

     

     

     

     ngOnInit() { 
          this.setNumberOfSingersDefault();
          this.addSong();
     }

     public moveViewIndex(index: number){

          let hasError = false;

          if (index === 5){
               this.disableAllControls();
          }

          else {
               this.enableAllControls();
          }


          if (index === 2) {
               const selectedSingers = (this.lineUpDataForm.get('singers')?.value || []).filter((s: User | null) => s !== null);
               this.singersSelected.set(selectedSingers);
          }

          if (!hasError) this.viewIndex.set(index);
     }

     private disableAllControls() {
          Object.keys(this.lineUpDataForm.controls).forEach(key => {
              this.lineUpDataForm.get(key)?.disable();
          });
     }
      
     private enableAllControls() {
          Object.keys(this.lineUpDataForm.controls).forEach(key => {
              this.lineUpDataForm.get(key)?.enable();
          });
     }

     // Singers
     protected getSingerOptions(index: number): User[] {
          const selectedIds = this.singersControls.map((ctrl, i) => i !== index ? ctrl.value?.id : null).filter(id => !!id);
          return this._singerOptions.filter(user => !selectedIds.includes(user.id));
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

     // Song Title
     protected get songTitle(): FormArray {
          return this.lineUpDataForm.get('songTitle') as FormArray;
     }

     protected get songTitleControls(): FormControl[] {
          return this.songTitle.controls as FormControl[];
     }
     
     protected addSongTitle(): void {
          this.songTitle.push(this.formBuilder.control('', Validators.required));
     }

     protected removeSongTitle(index: number): void {
          this.songTitle.removeAt(index);
     }

     // Song Artist
     protected get songArtist(): FormArray {
          return this.lineUpDataForm.get('songArtist') as FormArray;
     }

     protected get songArtistControls(): FormControl[] {
          return this.songArtist.controls as FormControl[];
     }
     
     protected addSongArtist(): void {
          this.songArtist.push(this.formBuilder.control('', Validators.required));
     }

     protected removeSongArtist(index: number): void {
          this.songArtist.removeAt(index);
     }

     // Song Link
     protected get songLink(): FormArray {
          return this.lineUpDataForm.get('songLink') as FormArray;
     }

     protected get songLinkControls(): FormControl[] {
          return this.songLink.controls as FormControl[];
     }
     
     protected addSongLink(): void {
          this.songLink.push(this.formBuilder.control('', Validators.required));
     }

     protected removeSongLink(index: number): void {
          this.songLink.removeAt(index);
     }


     // Song Assigned Singer
     protected getSongAssignedSingers(): User[] {
          return [User.createAllOption(), ...this.singersSelected()];
     }

     protected get songAssignedSinger(): FormArray {
          return this.lineUpDataForm.get('songAssignedSinger') as FormArray;
     }

     protected get songAssignedSingerControls(): FormControl[] {
          return this.songAssignedSinger.controls as FormControl[];
     }
     
     protected addSongAssignedSinger(): void {
          this.songAssignedSinger.push(this.formBuilder.control(null, Validators.required));
     }

     protected removeSongAssignedSinger(index: number): void {
          this.songAssignedSinger.removeAt(index);
     }

     protected addSong(): void {
          this.addSongTitle();
          this.addSongArtist();
          this.addSongLink();
          this.addSongAssignedSinger();
     }

     protected removeSong(index: number): void{
          this.removeSongTitle(index);
          this.removeSongArtist(index);
          this.removeSongLink(index);
          this.removeSongAssignedSinger(index);

     }

     protected hasFilledAllTheSingerFields(): boolean {
          const filledCount = this.singersControls.filter(control => control.value !== null).length;
          return filledCount === this.singersControls.length && filledCount > 0;
     }

     protected hasSelectedDateAndServiceType(): boolean {
          return this.lineUpDataForm.get('worshipDate')?.value && this.lineUpDataForm.get('serviceType')?.value 
     }

     private setNumberOfSingersDefault(): void {          
          for (let i = 0; i < 1; i++) {
               this.addSinger();
          }
     }


     private _showLineUpSubmittedSuccessfullyDialog(): void {
          this.primeNgDialog.show({
               header: 'Success',
               message: 'The line up was successfully created! The line up will go through approval process. Please check for notifications.',
               icon: 'pi pi-info-circle',
               iconColorToken: 'primary-contrast',
               iconBgColorToken: 'primary',
               buttons: [
                    {
                         label: 'OK',
                         action: () => this.primeNgDialog.dismissDialog(),
                         styleClass: 'p-button-primary',
                    },
               ],
          });
     }


     public onSubmitLineUpDataForm(): void {
          this.visible.set(false);
          this._showLineUpSubmittedSuccessfullyDialog();
     }

     

     protected showDialog(): void {
          this.visible.set(true);
     }

}
