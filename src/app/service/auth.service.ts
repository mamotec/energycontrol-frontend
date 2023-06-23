import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {AuthenticationControllerService, AuthenticationResponse} from "../api";

export interface AuthRequest {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private authControllerService: AuthenticationControllerService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  authenticate(username: string, password: string): void {
    let authRequest: AuthRequest = {
      username: username,
      password: password
    }

    this.authControllerService.authenticate(authRequest).subscribe({
      next: (token: AuthenticationResponse) => {

        if (token.token != undefined) {
          this.localStorageService.set("auth-token", token.token)
          this.router.navigate(['']);
        } else {
          this.logout()
        }
      },
      error: (error) => {
        console.log("Exception when logging on:", error)
      }
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

  getToken(): string {
    if (this.isLoggedIn()) {
      // @ts-ignore
      return this.localStorageService.get("auth-token")
    }
    return ""

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
