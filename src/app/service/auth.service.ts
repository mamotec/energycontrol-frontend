import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";

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
      this.router.navigate(['/app']);
    }, (error) => {
      console.log("Exception when logging on:", error)
    })
  }

  public logout(): void {
    localStorage.clear()
    window.location.reload();
  }

  isLoggedIn(): boolean {
    let token = this.localStorageService.get("auth-token")

    if (token == null) {
      return false;
    }

    return this.validateJwtToken(token);
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

}
