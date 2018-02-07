import { Component, ViewChildren, ViewChild, QueryList, ElementRef, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { addToTurnsList, hasWonBoard, hasWonGame, isBoardFull, isMoveAllowed, findAvailableBoards } from './gamelogic/';
import { AuthService } from './services/auth.service';
// import { ElementRef } from '@angular/core/src/linker/element_ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hasWon: boolean = false;
  current_turn: string;
  expected_board: number;
  player_has_won: string;
  previous_board: number;
  rule: string;
  boards: Array<any> = [0,1,2,3,4,5,6,7,8];

  constructor(private sService: SharedService, public authService: AuthService) {
    // this.sService.turnCast.subscribe(t => this.current_turn = t);
  }

  ngOnInit() {
    // this.authService.hasToken();
  }

  // @ViewChild('parent') el: ElementRef;
  // addClass(elems: Array<any>): void {
  //   elems.map(elem => {
  //     elem.className = 'active';
  //   });
  // }

  // removeClass(elems: Array<any>): void {
  //   elems.map(elem => {
  //     elem.className = '';
  //   });
  // }

  // handleClick(data) {
  //   var currGridSpans = Array.from(this.el.nativeElement.children[data.square].children[0].children);
  //   var prevGridSpans = Array.from(this.el.nativeElement.children[data.board].children[0].children);
  //   this.removeClass(prevGridSpans);
  //   this.addClass(currGridSpans);
  // }

}
