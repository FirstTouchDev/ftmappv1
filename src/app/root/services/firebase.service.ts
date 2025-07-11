import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, UpdateData, getDoc, query, where, getDocs, CollectionReference, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { from, map, catchError } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Collection, Field, Operators } from '../constants/firebase';
import { User } from '../constants/user.model';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class FirebaseService {

     constructor(
          private firestore: Firestore,
     ) {

     }

     public adminVerifyUserCredentials$(username: string, password: string): Observable<string | null> {
          const colRef = collection(this.firestore, Collection.USERACCOUNTS) as CollectionReference<DocumentData>;
          const q = query(colRef, where(Field.USERNAME, Operators.ISEQUALTO, username), where(Field.PASSWORD, Operators.ISEQUALTO, password));
          return from(getDocs(q)).pipe(
               map((documentId) => {
                    return !documentId.empty ? documentId.docs[0].id : null;
               }),
               catchError(err => {
                    throw err;
               })
          );
     }

     public adminAddData$<T extends object>(targetCollection: string, data: T): Observable<string> {
          const colRef = collection(this.firestore, targetCollection);
          return from(addDoc(colRef, data)).pipe(
               map(docRef => {
                    return docRef.id;
               }),
               catchError(err => {
                    throw err;
               })
          );
     }

     public adminGetData$<T>(targetCollection: string, id: string): Observable<T | null> {
          const docRef = doc(this.firestore, targetCollection, id);
          return from(getDoc(docRef)).pipe(
               map((docSnap) => {

                    if (docSnap.exists()) {
                         const data = docSnap.data() as T;
                         return { ...data, id } as T;
                    }

                    else {
                         return null;
                    }
               }),
               catchError((err) => {
                    return throwError(() => err);
               })
          );
     }



     public adminUpdateData$<T extends DocumentData>(targetCollection: string, id: string, data: UpdateData<T>): Observable<boolean> {
          const docRef = doc(this.firestore, targetCollection, id) as DocumentReference<T>;
          return from(updateDoc(docRef, data)).pipe(
               map(() => {
                    return true;
               }),
               catchError((err) => {
                    //this.ionicAlertService.presentAlert('Update Failed', 'Please check your internet connection. If issue persists consult the admin.');
                    return of(false);
               })
          );
     }

     public adminDeleteData$(targetCollection: string, docId: string): Observable<boolean> {
          const docRef = doc(this.firestore, targetCollection, docId);
          return from(getDoc(docRef)).pipe(
               switchMap((data) => {
                    if (data.exists()) {
                         return from(deleteDoc(docRef)).pipe(map(() => true));
                    } else {
                         console.warn(`⚠️ Document with ID ${docId} does not exist in ${targetCollection}`);
                         return of(false);
                    }
               }),
               catchError((err) => throwError(() => err))
          );
     }
}
