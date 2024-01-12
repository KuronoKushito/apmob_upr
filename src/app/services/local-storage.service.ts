import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value)); // untuk konversi JSON ke String
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // untuk konversi string ke JSON
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}