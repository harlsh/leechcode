import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}
  loginWithGoogle() {
    this.authService
      .GoogleAuth()
      .catch((e) => console.log(e.message));
  }
  login(loginData: LoginData) {
    this.authService
      .SignIn(loginData.email, loginData.password)
      .catch((e) => console.log(e.message));
  }
}
