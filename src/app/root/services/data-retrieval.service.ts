import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from '../constants/local-storage';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user.model';

@Injectable({
     providedIn: 'root'
})
export class DataRetrievalService {

     constructor(
          private localStorageService: LocalStorageService,
          private firebaseService: FirebaseService
     ) {

     }

     public getData<T>(localStorageKey: string = '', collection: string = '',): T | null{
          let results: T | null = this.localStorageService.get(localStorageKey);
          return results;
     }


}
