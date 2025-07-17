import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs';


@Injectable({
     providedIn: 'root'
})

export class DataHydrationService {

     

     constructor(
          private firebaseService: FirebaseService
     ){

     }

     // public hydrateReferences$<T extends { [key: string]: any }>(
     //      data$: Observable<T[]>,
     //      fieldToCollectionMap: {
     //           [field: string]: { collection: string, isArray?: boolean }
     //      }
     // ): Observable<(T & { [key: string]: any })[]> {
     //      return data$.pipe(
     //           switchMap(items => {
     //                const hydratedItems$ = items.map(item => {
     //                     const hydrations$ = Object.entries(fieldToCollectionMap).map(([field, config]) => {
     //                          const { collection, isArray } = config;
     //                          const refValue = item[field];
     
     //                          if (!refValue) return of({ field, refData: null });
     
     //                          if (isArray && Array.isArray(refValue)) {
     //                               const refFetches = refValue.map((id: string) =>
     //                                    this.firebaseService.adminGetData$<any>(collection, id, ).pipe(
     //                                         catchError(() => of(null))
     //                                    )
     //                               );
     
     //                               return forkJoin(refFetches).pipe(
     //                                    map(refDataList => ({ field, refData: refDataList }))
     //                               );
     //                          }
     
     //                          return this.firebaseServiceadminGetData$<any>(collection, refValue).pipe(
     //                               map(refData => ({ field, refData })),
     //                               catchError(() => of({ field, refData: null }))
     //                          );
     //                     });
     
     //                     return forkJoin(hydrations$).pipe(
     //                          map(hydratedFields => {
     //                               const enriched: any = { ...item };
     //                               hydratedFields.forEach(({ field, refData }) => {
     //                                    enriched[`${field}Ref`] = refData;
     //                               });
     //                               return enriched;
     //                          })
     //                     );
     //                });
     
     //                return forkJoin(hydratedItems$);
     //           })
     //      );
     // }
     
     
}
