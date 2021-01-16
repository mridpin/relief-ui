import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public inputUrl : String;
  url : String;

  constructor(private dataService : DataService) { 
    this.inputUrl = "";
    this.url = "";
  }

  ngOnInit(): void {
    //this.dataService.currentUrl.subscribe(url => this.url = url);
  }

  fetchVideo() {
    // todo: validate input
    // transform to embedded url and clean url from params
    var url = this.inputUrl.replace("watch?v=", "embed/").split("&")[0];
    this.dataService.setUrl(url);
    console.log(url);
    // todo: update global var with link
    // todo: save link to history component
    // todo: save link to view compionent
  }

}
