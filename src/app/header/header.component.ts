import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  turn: string;
  constructor(private sService: SharedService) {
    this.sService.turnCast.subscribe(t => this.turn = t);
  }

  ngOnInit() {
  }

}
