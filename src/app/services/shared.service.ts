import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Game } from '../interfaces/game';
import { Router } from '@angular/router';

@Injectable()
export class SharedService {
  private header = new BehaviorSubject<string>('X');
  private rule = new BehaviorSubject<string>('');

  headerCast = this.header.asObservable();
  ruleCast = this.rule.asObservable();
  expectedBoard: number;
  previousBoard: number;
  currentGame: Game;

  constructor(private router: Router) {}

  updateHeader(arg): void {
    this.header.next(arg);
  }


  getCurrentGame(): Game {
    if (this.currentGame) return this.currentGame;
    this.currentGame = JSON.parse(localStorage.getItem('currentGame'));
    if (this.currentGame === null) { this.router.navigate(['/games']); return;}
    return this.currentGame;
  }

  setRule(arg): void {
    this.rule.next(arg);
  }

  getExpectedBoard(): number {
    return this.expectedBoard;
  }

  setExpectedBoard(board: number) {
    this.expectedBoard = board;
  }

  getPreviousBoard(): number {
    return this.previousBoard;
  }

  setPreviousBoard(board: number) {
    this.previousBoard = board;
  }

}
