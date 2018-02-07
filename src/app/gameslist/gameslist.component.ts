import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {

  games: Array<Game>
  users: Array<any>
  currentUser: any;

  constructor(public authService: AuthService, public sService: SharedService, private db: AngularFireDatabase, private router: Router) {

    this.currentUser = this.authService.getUser();
    var list = this.db.list(`gameslist/${this.currentUser.uid}`).valueChanges().subscribe((r: Game[]) => this.games = this.removeKeys(r));
    //   // list.unsubscribe();
    this.db.list(`users`).valueChanges().subscribe(r => this.users = r.filter(user => { return this.currentUser.uid !== user['uid']; }));

  }




  ngOnInit() {
    this.authService.hasToken();
  }

  ngOnDestroy() {}


  removeKeys(data): any {
    var newArr = [];
    var arr = Object.values(data).map((item, index) => {
      return Object.values(item);
    });
    while (arr.length) {
      var value = arr.shift();
      if (Array.isArray(value)) {
        arr = value.concat(arr);
      } else {
        newArr.push(value);
      }
    }
    return newArr;
  }


  gameSelected(data) {
    localStorage.setItem('currentGame', JSON.stringify(data));
    this.router.navigate(['']);
  }

  userSelected(data) {
    var challengeUrl = [ data['uid'], this.currentUser.uid ].sort().join('+');
    this.db.list(`gameslist/${challengeUrl}`).push({})
      .then(r => {
        data['key'] = r.key;
        challengeUrl += '/' + r.key;
        [data['uid'], this.currentUser.uid]
          .map(u => {
            this.db.list(`gameslist`).set(`${u}/${challengeUrl}`,{
              opponent: {
                username: u === data.uid ? this.currentUser.username : data.username,
                uid: u === data.uid ? this.currentUser.uid : data.uid
              },
              letter: u === data.uid ? 'X' : 'O',
              id: challengeUrl,
              created_at: Date.now(),
              turn: data.uid,
              status: 'waiting',
              moves: [],
              key: r.key
            });
          });
      });
  }

}
