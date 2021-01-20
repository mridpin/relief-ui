import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {History} from "../interfaces/history";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  viewHistory : Array<History>;

  constructor(private dataService : DataService) { 
    this.viewHistory = new Array();
  }

  ngOnInit(): void {
    this.dataService.currentHistory.subscribe(history => {
      this.viewHistory = history;
    });
    this.dataService.getHistory().subscribe(res => {
      this.viewHistory = res;
    });
  }

  reloadVideo(item : string): void {
    this.dataService.setUrl(item);
  }

}
