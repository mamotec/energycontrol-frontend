import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private localStorageService: LocalStorageService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.localStorageService.get("auth-token")

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer $(token)`
        }
      })
    }

    return next.handle(req)
  }


}