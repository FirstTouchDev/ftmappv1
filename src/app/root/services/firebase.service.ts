import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, UpdateData, getDoc, query, where, getDocs, CollectionReference, deleteDoc, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { from, map, catchError } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Collection, Field, Operators } from '../constants/firebase';
import { User } from '../models/user.model';
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

     public adminGetAllByArrayFieldContains$<T>(targetCollection: string,arrayField: string,value: string): Observable<T[]> {
          const colRef = collection(this.firestore, targetCollection);
          const q = query(colRef, where(arrayField, Operators.ARRAYCONTAINS, value));

          return from(getDocs(q)).pipe(
               map(snapshot => snapshot.docs.map(docSnap => {
                    const data = docSnap.data() as T;
                    return { ...data, id: docSnap.id } as T;
               })),
               catchError(err => throwError(() => err))
          );
     }

     public adminGetAllData$<T>(targetCollection: string): Observable<T[]> {
          const colRef = collection(this.firestore, targetCollection);
     
          return from(getDocs(colRef)).pipe(
               map(snapshot =>
                    snapshot.docs.map(docSnap => {
                         const data = docSnap.data() as T;
                         return { ...data, id: docSnap.id } as T;
                    })
               ),
               catchError(err => throwError(() => err))
          );
     }     


     public adminGetDataByField$<T>(targetCollection: string, field: string, value: any): Observable<T | null> {
          const collectionRef = collection(this.firestore, targetCollection);
          const queryRef = query(collectionRef, where(field, '==', value), limit(1));

          return from(getDocs(queryRef)).pipe(
               map((querySnapshot) => {
                    if (!querySnapshot.empty) {
                         const docSnap = querySnapshot.docs[0];
                         const data = docSnap.data() as T;
                         return { ...data, id: docSnap.id } as T;
                    } else {
                         return null;
                    }
               }),
               catchError((err) => throwError(() => err))
          );
     }


     public adminUpdateData$<T extends DocumentData>(targetCollection: string, id: string, data: UpdateData<T>): Observable<boolean> {
          const docRef = doc(this.firestore, targetCollection, id) as DocumentReference<T>;
          return from(updateDoc(docRef, data)).pipe(
               map(() => {
                    return true;
               }),
               catchError((err) => {
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
                         return of(false);
                    }
               }),
               catchError((err) => throwError(() => err))
          );
     }

     public adminCheckDoesDataExist$(targetCollection: string, fieldName: string, value: any): Observable<boolean> {
          const colRef = collection(this.firestore, targetCollection) as CollectionReference<DocumentData>;
          const q = query(colRef, where(fieldName, Operators.ISEQUALTO, value));
          return from(getDocs(q)).pipe(
               map(snapshot => !snapshot.empty),
               catchError(err => {
                    console.error(`Error checking value in ${targetCollection}.${fieldName}:`, err);
                    return of(false);
               })
          );
     }
}
