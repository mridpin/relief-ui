import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Bookmark} from "../interfaces/bookmark";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  bookmarks: Array<Bookmark>;

  constructor(private dataService: DataService) {
    this.bookmarks = new Array();
  }

  ngOnInit(): void {
    this.dataService.currentBookmarks.subscribe(bookmark => {
      this.bookmarks = bookmark;
    });
    this.dataService.getBookmark().subscribe(res => {
      this.bookmarks = res;
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
