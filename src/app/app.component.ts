import { Component } from '@angular/core';
import { addToTurnsList, hasWonBoard, hasWonGame} from './gamelogic/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hasWon: boolean = false;
  current_turn: string = "o";
  current_board: number;
  expected_board: number;
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

    // check if player has already gone.
    if (target === 'x' || target === 'o') return;

    if (this.expected_board && this.expected_board !== data.board)
      return console.log(`select ${this.expected_board}`);

    this.expected_board = data.square;

    this.removeClass(Array.from(ev.target.parentNode.children));

    this.addClass(Array.from(ev.target.parentNode.parentNode.children[this.expected_board].children));

    addToTurnsList(data, this.current_turn);

    // check to see if player has won board
    if (hasWonBoard(data, this.current_turn)) {
      // this.hasWon = true;
      console.log(this.current_turn, 'has won board');
      // check to see if player has won game
      this.hasWon = hasWonGame(this.current_turn);

      if (this.hasWon) console.log(this.current_turn, 'has won game');

    }

    if (this.current_turn === 'o')
      ev.target.innerHTML = 'o', this.current_turn = 'x';
    else ev.target.innerHTML = 'x', this.current_turn = 'o';

  }
}
