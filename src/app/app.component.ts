import { Component } from '@angular/core';
import { addToTurnsList, hasWonBoard, hasWonGame, isBoardFull, isMoveAllowed, findAvailableBoards } from './gamelogic/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hasWon: boolean = false;
  current_turn: string = "o";
  expected_board: number;
  player_has_won: string;
  previous_board: number;

  constructor() {

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


  selected(ev, data): void {

    let target = ev.target.innerHTML;

    // check if square is already taken.
    if (target === 'x' || target === 'o') return;

    if (this.previous_board !== undefined && !isMoveAllowed(data, this.previous_board)) {
      // alert user of this.
      console.log('cant send user back');
      return;
    }

    if (this.expected_board && this.expected_board !== data.board)
      return console.log(`select ${this.expected_board}`);

    this.expected_board = data.square;

    this.previous_board = data.board;

    this.removeClass(Array.from(ev.target.parentNode.children));

    this.addClass(Array.from(ev.target.parentNode.parentNode.children[this.expected_board].children));

    addToTurnsList(data, this.current_turn);

    // check to see if player has won board
    if (hasWonBoard(data, this.current_turn)) {
      // check to see if player has won game
      if (hasWonGame(this.current_turn)) {
        this.player_has_won = `${this.current_turn} has won!`
        return;
      }

    }

    if (this.current_turn === 'o')
      ev.target.innerHTML = 'o', this.current_turn = 'x';
    else ev.target.innerHTML = 'x', this.current_turn = 'o';

    if (isBoardFull(data)) {
      this.expected_board = undefined;
      this.previous_board = undefined;
      let boards = findAvailableBoards();
      console.log('boards full');
      console.log(boards);
      // ev.target.parentNode.parentNode.children
        // iterate over above with corrosponding boards avail; set class to active
      // tell user to select any board available
    }

  }
}
