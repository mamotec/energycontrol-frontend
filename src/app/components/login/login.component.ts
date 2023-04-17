import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: [Validators.required],
      password: [Validators.required]
    });
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value)
  }

}
