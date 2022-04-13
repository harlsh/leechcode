import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn  : boolean;
  constructor(public authService: AuthService, private router: Router, public cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      userData => this.isLoggedIn = !!userData
  );
    console.log("ngInit", this.isLoggedIn)
  }

  logout() {
    this.authService
      .SignOut()
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
      this.isLoggedIn = false;
      this.ngOnInit()
  }

}
