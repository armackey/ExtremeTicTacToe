import { Component, OnInit } from '@angular/core';
import { SharedService } from "../services/shared.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  rule: string;

  constructor(private sService: SharedService) {
    this.sService.ruleCast.subscribe(r => this.rule = r);
  }

  ngOnInit() {
  }

}
