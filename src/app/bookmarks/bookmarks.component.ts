import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  bookmarks: Array<string>;

  constructor(private dataService: DataService) {
    this.bookmarks = new Array();
  }

  ngOnInit(): void {
    this.dataService.currentBookmarks.subscribe(bookmark => {
      this.bookmarks = bookmark;
    });
  }

  addUrlToBookmarks(): void {
    if (!this.dataService.addUrlToBookmarks()) {
      alert("Bookmark already exists!");
    }
  }

  reloadVideo(item : string): void {
    this.dataService.setUrl(item);
  }

}
