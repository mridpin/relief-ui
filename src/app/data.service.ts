import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { History } from "./interfaces/history";
import { Bookmark } from "./interfaces/bookmark";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private historyUrl: string = "http://localhost:8000/history/";
  private bookmarkUrl: string = "http://localhost:8000/bookmark/";

  private urlSource = new BehaviorSubject<string>("about:blank");
  currentUrl = this.urlSource.asObservable();

  history: Array<History>;
  private historySource = new BehaviorSubject<Array<History>>([]);
  currentHistory = this.historySource.asObservable();

  bookmarks: Array<Bookmark>;
  private bookmarksSource = new BehaviorSubject<Array<Bookmark>>([]);
  currentBookmarks = this.bookmarksSource.asObservable();

  constructor(private http: HttpClient) {
    this.history = new Array();
    this.bookmarks = new Array();
  }

  setUrl(newUrl: string) {
    this.urlSource.next(newUrl);
    this.postHistory(newUrl).subscribe(res => {

    });
  }

  addUrlToBookmarks(): boolean {
    var newBookmark: Bookmark = {
      url: this.urlSource.getValue(),
    };
    var res: boolean = true;
    // reject bookmark if it exists
    if (this.bookmarks.some(item => item.url === this.urlSource.getValue())) {
      res = false;
    } else {
      this.postBookmark(newBookmark).subscribe(res => {
        this.reloadBookmarks();
      });
    }
    return res;
  }

  reloadBookmarks() {
    this.getBookmark().subscribe(res => {
      this.bookmarks = res;
      this.bookmarksSource.next(this.bookmarks);
    });
  }

  removeBookmark(bm: Bookmark): void {
    this.deleteBookmark(bm).subscribe(res => {
      this.getHistory().subscribe(res => {
        this.reloadBookmarks();
      })
    })
  }

  getHistory() {
    return this.http.get<History[]>(this.historyUrl);
  }

  postHistory(newUrl: string) {
    var payload: History = {
      url: newUrl,
    };
    return this.http.post<History>(this.historyUrl, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBookmark() {
    return this.http.get<Bookmark[]>(this.bookmarkUrl);
  }

  postBookmark(payload: Bookmark) {
    return this.http.post<Bookmark>(this.bookmarkUrl, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBookmark(payload: Bookmark) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: payload,
    };
    return this.http.delete(this.bookmarkUrl, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(`An error ocurred on request, status ${error.status}`);
    return throwError("Error ocurred");
  }
}
