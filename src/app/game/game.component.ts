import { Component, ViewChildren, ViewChild, QueryList, ElementRef, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { addToTurnsList, hasWonBoard, hasWonGame, isBoardFull, isMoveAllowed, findAvailableBoards, getBoards } from '../gamelogic/';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Game } from '../interfaces/game';
import { Router } from '@angular/router';
// import { setBoards,  } from '../gamelogic/index';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('parent') el: ElementRef;

  boards: Array<any> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  currentGame: Game;
  moves: any;
  constructor(private sService: SharedService, public authService: AuthService, private router: Router, private db: AngularFireDatabase) {
    // this.sService.turnCast.subscribe(t => this.current_turn = t);

  }

  ngOnInit() {
    this.authService.hasToken();
    this.currentGame = this.sService.getCurrentGame();
    var opLetter = this.currentGame.letter == 'O' ? 'X' : 'O';
    this.db.list(`gameslist/${this.authService.getUser().uid}/`).valueChanges().subscribe(r => {
      let game = r.map(d => {
        let g = d[this.currentGame['key']];
        if (g) {
          this.sService.setExpectedBoard(g.expectedBoard);
          this.sService.setPreviousBoard(g.previousBoard);
          this.currentGame.turn = g['turn'];
          this.sService.updateHeader({
            letter: g.turn === this.authService.getUser().uid ? this.currentGame.letter : opLetter,
            username: g.turn === this.authService.getUser().uid ? this.authService.getUser().username : this.currentGame.opponent.username
          });
          this.handleClick({ square: g.expectedBoard, board: g.previousBoard });
          return g['moves'];
        }
      });
      Object.keys(game[0] || []).map(board => {
        var squares = game[0][board];
        while (squares.length) {
          let s = squares.shift();
          addToTurnsList({board: board, square: s.square}, s.conquered);
          this.el.nativeElement.children[board].children[0].children[s.square].innerHTML = s.conquered;
        }
      })
    });
  }


  addClass(elems: Array<any>): void {
    elems.map(elem => {
      elem.className = 'active';
    });
  }

  removeClass(elems: Array<any>): void {
    elems.map(elem => {
      elem.className = '';
    });
  }

  handleClick(data) {
    if (data.square === undefined || data.board === undefined) return;
    var currGridSpans = Array.from(this.el.nativeElement.children[data.square].children[0].children);
    var prevGridSpans = Array.from(this.el.nativeElement.children[data.board].children[0].children);
    this.removeClass(prevGridSpans);
    this.addClass(currGridSpans);
  }

}
