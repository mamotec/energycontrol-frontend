import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

export interface JwtToken {
  token: string
}

export interface AuthRequest {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject(false);

  private RESOURCE = "auth/"

  constructor(private backend: ApiService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  authenticate(username: string, password: string): void {
    let authRequest: AuthRequest = {
      username: username,
      password: password
    }

    this.backend.post<AuthRequest>(this.RESOURCE + "authenticate", authRequest).subscribe((data: JwtToken) => {
      this.localStorageService.set("auth-token", data.token)
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }, (error) => {
      console.log("Exception when logging on:", error)
      this.loggedIn.next(false);
    })
  }

  logout(): void {
    localStorage.clear()
    this.loggedIn.next(false);
  }

}
