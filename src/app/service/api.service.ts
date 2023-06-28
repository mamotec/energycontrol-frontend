import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageService} from "./local-storage.service";
import jwtDecode from "jwt-decode";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService,
  ) {
  }

  isLoggedIn(): boolean {
    let token = this.localStorageService.get("auth-token")

    if (token == null) {
      return false;
    }

    return this.validateJwtToken(token);
  }

  public GetAccessToken(): string {
    if (this.isLoggedIn()) {
      // @ts-ignore
      return this.localStorageService.get("auth-token")
    }
    return "";

  }

  validateJwtToken(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const tokenExpire = new Date(decodedToken.exp * 1000);
    const now = new Date();

    if (tokenExpire < now) {
      this.logout()
      return false
    }

    return true
  }

  public logout(): void {
    localStorage.clear()
    window.location.reload();
  }


  post<T>(resource: string, item: T): Observable<any> {
    return this.http.post<T>(this.API_URL + resource, item);
  }

  getAll<T>(resource: string): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL + resource);
  }

  getOne<T>(resource: string, id: number | string): Observable<T> {
    const getUrl = this.API_URL + `${resource}/${id}`;
    return this.http.get<T>(getUrl);
  }

  put<T>(resource: string, id: number | string, item: T): Observable<T> {
    const updateUrl = `this.API_URL + ${resource}/${id}`;
    return this.http.put<T>(updateUrl, item);
  }

  delete(resource: string, id: number | string): Observable<{}> {
    const deleteUrl = this.API_URL + `${resource}/${id}`;
    return this.http.delete(deleteUrl);
  }
}
