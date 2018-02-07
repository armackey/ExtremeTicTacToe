import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireModule  } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase,  } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  username: string;
  password: string;
  titleAlert: string;
  userExist: boolean;
  // users: FirebaseListObservable<any>

  constructor(private fb: FormBuilder, public sService: SharedService, private router: Router, public authService: AuthService, private db: AngularFireDatabase) {
    this.rForm = fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      validate: ''
    });
  }

  ngOnInit() {
    this.authService.hasToken();
  }

  createUser(data) {
    this.userExist = false;
    var users = this.db.list('/users')
      .valueChanges()
      .subscribe(results => {
      results.map(r => {
        if (r['username'] === data.name || r['email'] === data.email)
          this.userExist = true;
      });

      users.unsubscribe();

      if (this.userExist) {
        this.authService.signIn(data)
          .then(result => {
            localStorage.setItem('ttt', JSON.stringify({
              token: result['user']['refreshToken'],
              username: data.name,
              email: data.email,
              uid: result['user']['uid']
            }));
            // this.sService.user = new User(result['user']['uid'], data.name, data.email);
            this.router.navigate(['/games']);
            this.authService.hasLoggedIn.emit();
          })
          .catch(e => this.titleAlert = e.message);
      } else {
        this.authService.signUp(data)
          .then(result => {
            localStorage.setItem('ttt', JSON.stringify({
              token: result['token'],
              uid: result['uid'],
              username: data.name,
              email: data.email
            }));
            this.db.list('/users').set(result['uid'], {
              username: data.name,
              email: data.email,
              uid: result['uid']
            });
            // this.sService.user = new User(result['uid'], data.name, data.email);
            this.authService.hasLoggedIn.emit();
            this.router.navigate(['/games']);
          })
          .catch(e => this.titleAlert = e.message);
      }
    });

  }

}
