import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}
  resetpassword(reset: resetpassword) {
    this.authService
      .ForgotPassword(reset.email)
      .catch((e) => console.log(e.message));
  }
}
export interface resetpassword {
  email: string;
}
