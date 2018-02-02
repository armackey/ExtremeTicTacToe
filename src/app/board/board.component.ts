import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { addToTurnsList, hasWonBoard, hasWonGame, isBoardFull, isMoveAllowed, findAvailableBoards } from '../gamelogic/';
import { SharedService } from '../services/shared.service';

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

  constructor(private sService: SharedService) {
    this.sService.turnCast.subscribe(t => this.current_turn = t);
  }

  ngOnInit() {}

  selected(ev, value) {
    let target = ev.target.innerHTML;
    // check if square is already taken.
    if (target === 'X' || target === 'O')
      return this.sService.setRule("space already taken");

    // this.squareClicked.emit(value);
    this.previousBoard = this.sService.getPreviousBoard();

    if (this.previousBoard && !isMoveAllowed(value, this.previousBoard))
      return this.sService.setRule("can't send user back unless it's only option");

    this.sService.setRule("");
    // // console.log("expected", this.expectedBoard);
    //// console.log("selected", value.board);

    this.expectedBoard = this.sService.getExpectedBoard();

    if (this.expectedBoard && this.expectedBoard !== value.board)
      return;



    this.sService.setExpectedBoard(value.square);
    this.sService.setPreviousBoard(value.board);

    addToTurnsList(value, this.current_turn);

    // check to see if player has won board
    if (hasWonBoard(value, this.current_turn)) {
      // check to see if player has won game
      this.hasWon = hasWonGame(this.current_turn);
      if (this.hasWon) {
        this.player_has_won = `${this.current_turn} has won!`
        return;
      }

    }
    console.log(ev);
    // this.removeClass(Array.from(ev.target.parentNode.children));

    // this.addClass(Array.from(ev.target.parentNode.parentNode.children[0].children));



    if (this.current_turn === 'O')
      ev.target.innerHTML = 'O', this.sService.toggleTurn('X');
    else
      ev.target.innerHTML = 'X', this.sService.toggleTurn('O');

    if (isBoardFull(value)) {
      this.expectedBoard = undefined;
      this.previousBoard = undefined;
      let boards = findAvailableBoards();

      // ev.target.parentNode.parentNode.children
      // iterate over above with corrosponding boards avail; set class to active
    }

    this.squareClicked.emit(value);

    this.sService.setExpectedBoard(value.square);

  }

}
