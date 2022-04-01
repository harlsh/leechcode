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
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
  }
}
