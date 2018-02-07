import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn: boolean;

  constructor(public authService: AuthService, private router: Router) {
    this.check();
    this.authService.hasLoggedIn.asObservable().subscribe(r => {
      this.check();
    });
  }

  check() {
    this.loggedIn = this.authService.getUser() ? true : false;
  }

  ngOnInit() {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
    this.loggedIn = false;
  }

}
