import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value)
  }

}
