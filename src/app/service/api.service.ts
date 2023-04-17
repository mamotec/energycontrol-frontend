import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private API_URL = "http://localhost:8080/"

  constructor(private http: HttpClient) {
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
