import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

export const authGuard = () => {
  let router: Router = inject(Router)
  let authService: AuthService = inject(AuthService)

  if (authService.loggedIn.value) {
    return true;
  }
  return router.parseUrl("/login");
}

