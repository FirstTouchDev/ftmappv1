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

     /**
      * Verifies user credentials (username and password) against the USERACCOUNTS Firestore collection.
      * If a match is found, returns the document ID of the user account; otherwise, returns null.
      *
      * @param username - The username to check.
      * @param password - The corresponding password to verify.
      * @returns Observable<string | null> - The document ID if credentials are valid, or null if invalid.
      */
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

     /**
      * Adds a new document to the specified Firestore collection with the provided data.
      * Returns the auto-generated document ID upon successful creation.
      *
      * @param targetCollection - The name of the Firestore collection to add the document to.
      * @param data - The data object to store in the new document.
      * @returns Observable<string> - The ID of the newly created document.
      */
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

     /**
      * Retrieves all documents from the specified Firestore collection.
      * Each document's data is returned along with its document ID.
      *
      * @param targetCollection - The name of the Firestore collection to retrieve data from.
      * @returns Observable<T[]> - An array of documents with their data and IDs.
      */
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

     

     /**
      * Retrieves a single document from the specified Firestore collection by its document ID.
      * If the document exists, returns its data merged with the document ID; otherwise, returns null.
      *
      * @param targetCollection - The name of the Firestore collection to fetch the document from.
      * @param id - The document ID to retrieve.
      * @returns Observable<(T & { id: string }) | null> - The document data with its ID if found, or null if not found.
      */
     public adminGetSingleData$<T>(targetCollection: string, id: string): Observable<(T & { id: string }) | null> {
          const docRef = doc(this.firestore, targetCollection, id);
          return from(getDoc(docRef)).pipe(
               map((docSnap) => {
                    if (docSnap.exists()) {
                         const data = docSnap.data() as T;
                         return { ...data, id };
                    } 
                    else {
                         return null;
                    }
               }),
               catchError(err => throwError(() => err))
          );
     }

     /**
      * Updates an existing document in the specified Firestore collection with the provided data.
      * Returns true if the update is successful, or false if an error occurs.
      *
      * @param targetCollection - The name of the Firestore collection containing the document.
      * @param id - The document ID to update.
      * @param data - The partial data to update in the document.
      * @returns Observable<boolean> - True if the update was successful, false otherwise.
      */
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

     /**
      * Deletes a document from the specified Firestore collection if it exists.
      * First checks for the document's existence before attempting deletion.
      *
      * @param targetCollection - The name of the Firestore collection.
      * @param docId - The ID of the document to delete.
      * @returns Observable<boolean> - True if the document was successfully deleted, false if it does not exist.
      */
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

     /**
      * Checks if a document exists in a specified Firestore collection.
      *
      * @param targetCollection - The name of the Firestore collection to query.
      * @param docId - The ID of the document to check for existence.
      * @returns An Observable that emits `true` if the document exists, otherwise `false`.
      *
      */
     public adminValidateDocExistence$(targetCollection: string, docId: string): Observable<boolean> {
          const docRef = doc(this.firestore, targetCollection, docId);
          return from(getDoc(docRef)).pipe(
               map(docSnap => docSnap.exists())
          );
     }
     

     /**
      * Retrieves the first document from the specified Firestore collection where the given field matches the provided value.
      * Returns the document data as type T with its Firestore `id` included, or `null` if no matching document is found.
      *
      * @template T - The expected type of the document data.
      * @param targetCollection - The name of the Firestore collection to query.
      * @param field - The field name to filter documents by.
      * @param value - The value to match against the specified field.
      * @returns An Observable emitting the first matching document as `T & { id: string }`, or `null` if not found.
      */
     public adminGetDataByFieldAndValue$<T>(targetCollection: string, field: string, value: any): Observable<T | null> {
          const collectionRef = collection(this.firestore, targetCollection);
          const queryRef = query(collectionRef, where(field, Operators.ISEQUALTO, value), limit(1));

          return from(getDocs(queryRef)).pipe(
               map((querySnapshot) => {
                    if (!querySnapshot.empty) {
                         const docSnap = querySnapshot.docs[0];
                         const data = docSnap.data() as T;
                         return { ...data, id: docSnap.id } as T;
                    } 
                    
                    else {
                         return null;
                    }
               }),
               catchError((err) => throwError(() => err))
          );
     }

     /*Old Functions to dispose*/


     /*public adminGetAllByArrayFieldContains$<T>(targetCollection: string, arrayField: string, value: string): Observable<T[]> {
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

     public adminGetDataByFieldValue$<T>(targetCollection: string, field: string, value: any): Observable<T[]> {
          const colRef = collection(this.firestore, targetCollection);
          const q = query(colRef, where(field, '==', value));

          return from(getDocs(q)).pipe(
               map(snapshot =>
                    snapshot.docs.map(docSnap => {
                         const data = docSnap.data() as T;
                         return { ...data, id: docSnap.id } as T;
                    })),
               catchError(err => throwError(() => err))
          );
     }
          
     */
}
