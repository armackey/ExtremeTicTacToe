import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { addToTurnsList, hasWonBoard, hasWonGame, isBoardFull, isMoveAllowed, findAvailableBoards, getBoards, setBoards } from '../gamelogic/';
import { SharedService } from '../services/shared.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { Game } from '../interfaces/game';

interface BoardNum {
  num: number
};

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() bNum: BoardNum;
  @Output() squareClicked = new EventEmitter();

  hasWon: boolean = false;
  current_turn: string;
  expectedBoard: number;
  player_has_won: string;
  previousBoard: number;
  conquered: string;
  currentGame: Game;

  constructor(private sService: SharedService, private db: AngularFireDatabase, public authService: AuthService) {
    this.sService.headerCast.subscribe(r => this.current_turn = r);
  }

  ngOnInit() {

    // if (this.currentGame && this.currentGame.moves) {
    //   console.log(this.currentGame.moves);
    // }
  }

  selected(ev, value) {
    let target = ev.target.innerHTML;
    // check if square is already taken.
    this.currentGame = this.sService.getCurrentGame();

    if (target === 'X' || target === 'O')
      return this.sService.setRule("space already taken");

    if (this.currentGame.turn !== this.authService.getUser().uid)
      return this.sService.setRule("not your turn");

    this.previousBoard = this.sService.getPreviousBoard();

    if (this.previousBoard && !isMoveAllowed(value, this.previousBoard))
      return this.sService.setRule("can't send user back unless it's only option");

    this.sService.setRule("");

    this.expectedBoard = this.sService.getExpectedBoard();

    if (this.expectedBoard !== undefined && this.expectedBoard !== value.board)
      return;

    this.sService.setExpectedBoard(value.square);

    this.sService.setPreviousBoard(value.board);

    addToTurnsList(value, this.currentGame.letter);

    this.currentGame.turn = this.currentGame.opponent.uid;

    [this.authService.getUser().uid, this.currentGame.opponent.uid]
      .map(u => {
        this.db.list(`gameslist/${u}`).update(this.currentGame.id, Object.assign({},
          { moves: getBoards() },
          { turn: this.currentGame.opponent.uid },
          // this.currentGame,
          { previousBoard: value.board },
          { expectedBoard: value.square }
      ));
    });


    // check to see if player has won board
    if (hasWonBoard(value, this.current_turn)) {
      // check to see if player has won game
      this.conquered = this.current_turn;

      this.hasWon = hasWonGame(this.current_turn);
      if (this.hasWon) {
        // this.sService.updateHeader(`${this.current_turn} has won!`);
        return;
      }

    }


    if (isBoardFull(value)) {
      this.expectedBoard = undefined;
      this.previousBoard = undefined;
      let boards = findAvailableBoards();

      // ev.target.parentNode.parentNode.children
      // iterate over above with corrosponding boards avail; set class to active
    }

    this.squareClicked.emit(value);

    // this.sService.setExpectedBoard(value.square);

  }

}
