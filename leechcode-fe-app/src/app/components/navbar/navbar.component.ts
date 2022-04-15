import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { simpleUser } from 'src/app/models/simpleuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;
  constructor(
    public authService: AuthService,
    private router: Router,
    public cd: ChangeDetectorRef
  ) {
    }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (userData) => (this.isLoggedIn = !!userData)
    );
    
  }

  logout() {
    this.authService
      .SignOut()
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
    this.isLoggedIn = false;
    this.ngOnInit();
  }
}
