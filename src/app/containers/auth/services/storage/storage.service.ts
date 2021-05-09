import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private memoryStorage: { [key: string]: any } = {};

  constructor() {}

  setItem(key: string, item: any, memory?: boolean) {
    if (memory) {
      this.memoryStorage[key] = item;
    } else {
      try {
        localStorage.setItem(key, item);
      } catch (e) {
        console.error('LocalStorage error', e);
      }
    }
  }

  getItem(key: string, memory?: boolean) {
    if (memory) {
      return this.memoryStorage[key];
    } else {
      return localStorage.getItem(key);
    }
  }

  removeItem(key: string, memory?: boolean) {
    if (memory) {
      delete this.memoryStorage[key];
    } else {
      localStorage.removeItem(key);
    }
  }
}
