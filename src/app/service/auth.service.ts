import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";

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
      this.router.navigate(['/dashboard']);
    }, (error) => {
      console.log("Exception when logging on:", error)
    })
  }

  logout(): void {
    localStorage.clear()
  }

  isLoggedIn(): boolean {
    return this.localStorageService.get("auth-token") != null;
  }

}
