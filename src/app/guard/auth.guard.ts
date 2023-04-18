import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

export const authGuard = () => {
  let router: Router = inject(Router)
  let authService: AuthService = inject(AuthService)

  if (authService.isLoggedIn()) {
    return true;
  }
  return router.navigate(["/auth"]);
}

