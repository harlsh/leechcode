import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  isLoggedIn: boolean;
  isAdmin: boolean;
  constructor(
    public authService: AuthService,
    public router: Router
  ){ 
    this.authService.user$.subscribe(
        userData => this.isLoggedIn = !!userData
    );
    this.authService.adminState$.subscribe((data: any) => {
      this.isAdmin = data.data().isAdmin;
        console.log(this.isAdmin);
      });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.isAdmin === false) {
      this.router.navigate(['/myprofile'])
    }
    return true;
  }
}
