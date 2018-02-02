import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  private turn = new BehaviorSubject<string>('X');
  private rule = new BehaviorSubject<string>('');

  turnCast = this.turn.asObservable();
  ruleCast = this.rule.asObservable();
  expectedBoard: number;
  previousBoard: number;
  constructor() {}

  toggleTurn(arg): void {
    this.turn.next(arg);
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
