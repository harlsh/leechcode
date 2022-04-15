import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Injectable, NgZone } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; 
  constructor(
    public afs: AngularFirestore,
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router,
  public ngZone: NgZone) {
     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  user$ = this.afAuth.authState;
  adminState$  = this.retrieveAdminStatus();
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result.user);
        const user = result.user;
        if (user){
          this.afs.collection('users').doc(user.uid).set({
          isAdmin: false,
          email: user.email,
        });
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null  ? true : false;
  }

  retrieveUsers(){
    let query = this.afs.collection('users');
    return query.get()
    .pipe(
        map(snapshot => {
            let items: any[] = [];
            snapshot.docs.map(a => {
                const data = a.data();
                const id = a.id;
                items.push({ id, data })
            })
            return items;
        }),
    )

  }

 retrieveAdminStatus(){
    let userObj = JSON.parse(localStorage.getItem('user')!);
    if(userObj){
      return this.afs.collection('users').doc(userObj.uid).get();
    }
    return userObj;
  }
  toggleAdmin(uid: string, admin: boolean){
    this.afs.collection('users').doc(uid).update({
      isAdmin: admin,
    });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
        this.SetUserData(result.user);
        const user = result.user;
        if (user){
          this.afs.collection('users').doc(user.uid).update({
  
            email: user.email,
        });
        }
        
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
  
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  uid: string;
   email: string;
   displayName: string;
}
