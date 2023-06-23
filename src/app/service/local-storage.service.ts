import {Injectable} from '@angular/core';
import {Configuration} from "../api";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
