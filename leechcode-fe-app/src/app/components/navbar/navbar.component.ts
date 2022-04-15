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
    authService.adminState$.subscribe((data: any) => {

      var obj = JSON.parse(JSON.stringify(data.data()));
      let user = new simpleUser(obj.uid, obj.email, obj.isAdmin);
      console.log(user);
      this.isAdmin = user.isAdmin;
     console.log("THIS IS ISADMIN",user.isAdmin);
    });}

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
