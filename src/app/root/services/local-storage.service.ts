import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root'
})
export class LocalStorageService {

     public set(key: string, value: any): void {
          localStorage.setItem(key, JSON.stringify(value));
     }

     public get<T>(key: string): T {
          const item = localStorage.getItem(key);
          if (!item) return null as T;
          return JSON.parse(item) as T;
     }

     public remove(key: string): void {
          localStorage.removeItem(key);
     }

     public clear(): void {
          localStorage.clear();
     }
}
