import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlSource = new BehaviorSubject<string>("about:blank");
  currentUrl = this.urlSource.asObservable();

  history: Array<string>;
  private historySource = new BehaviorSubject<Array<string>>([]);
  currentHistory = this.historySource.asObservable();

  bookmarks: Array<string>;
  private bookmarksSource = new BehaviorSubject<Array<string>>([]);
  currentBookmarks = this.bookmarksSource.asObservable();

  constructor() {
    this.history = new Array();
    this.bookmarks = new Array();
  }

  setUrl(url: string) {
    this.urlSource.next(url);
    // todo: save link to history component
    this.history.push(url);
    this.historySource.next(this.history);
    // todo: save link to view compionent
  }

  addUrlToBookmarks(): boolean {
    var res: boolean = true;
    if (this.bookmarks.includes(this.urlSource.getValue())) {
      res = false;
    } else {
      this.bookmarks.push(this.urlSource.getValue());
      this.bookmarksSource.next(this.bookmarks);
      console.log(this.urlSource.getValue());
      console.log(this.bookmarks);
    }
    return res;
  }

}
