import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header: string;
  username: string;
  constructor(private sService: SharedService) {
    this.sService.headerCast.subscribe(r => { this.header = r['letter']; this.username = r['username']});
  }

  ngOnInit() {
  }

}
