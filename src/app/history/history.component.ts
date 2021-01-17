import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  viewHistory : Array<string>;

  constructor(private dataService : DataService) { 
    this.viewHistory = new Array();
  }

  ngOnInit(): void {
    this.dataService.currentHistory.subscribe(history => {
      this.viewHistory = history;
      console.log(this.viewHistory);
    });
  }

  // todo: onclick element readd to the history

}
