import { ApplicationSettings } from '@nativescript/core';

export class StorageService {
  setItem(key: string, value: any): void {
    ApplicationSettings.setString(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const value = ApplicationSettings.getString(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    ApplicationSettings.remove(key);
  }

  clear(): void {
    ApplicationSettings.clear();
  }
}