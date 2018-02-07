import { Injectable, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  @Output() hasLoggedIn = new EventEmitter();

  constructor(private router: Router, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

  }

  getUser(): any {
    var user = JSON.parse(localStorage.getItem('ttt'));
    if (user === null) {
      this.router.navigate(['/login']);
      return;
    }
    return user;
  }

  signIn(data): Promise<any> {
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(data.email, data.password);
  }

  signUp(data): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  hasToken(): void {
    var user = this.getUser();
    if (!user || user === null) this.router.navigate(['/login']);
  }
}
