import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationControllerService} from "../../api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  submitted = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;

    this.authService.authenticate(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
