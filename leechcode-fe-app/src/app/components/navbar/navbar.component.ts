import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn)
  }

  logout() {
    this.authService
      .SignOut()
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
  }

}
