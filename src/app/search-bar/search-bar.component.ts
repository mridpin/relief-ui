import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public inputUrl : string;
  url : string;
  valid : boolean;
  regex : RegExp;

  constructor(private dataService : DataService) { 
    this.inputUrl = "";
    this.url = "";
    this.valid = false;
    this.regex = new RegExp("^https://www.youtube.com/.*");
  }

  ngOnInit(): void {}

  fetchVideo() {
    // transform to embedded url and clean url from params
    var url = this.inputUrl.replace("watch?v=", "embed/").split("&")[0];
    this.dataService.setUrl(url);
    this.inputUrl = "";
    this.valid = false;
  }

  validateUrl() {
    this.valid = this.regex.test(this.inputUrl);
  }
}
