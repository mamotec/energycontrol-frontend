import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {LocalStorageService} from "./local-storage.service";

export interface JwtToken {
  token: string
}

export interface AuthRequest {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false

  private RESOURCE = "auth/"

  constructor(private backend: ApiService,
              private localStorageService: LocalStorageService) {
  }

  authenticate(username: string, password: string): void {
    let authRequest: AuthRequest = {
      username: username,
      password: password
    }

    this.backend.post<AuthRequest>(this.RESOURCE + "authenticate", authRequest).subscribe((data: JwtToken) => {
      this.localStorageService.set("auth-token", data.token)
      this.isLoggedIn = true
    }, (error) => {
      console.log("Exception when logging on:", error)
      this.isLoggedIn = false
    })
  }

  logout(): void {
    this.localStorageService.remove("auth-token")
    this.isLoggedIn = false;
  }

  userLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
