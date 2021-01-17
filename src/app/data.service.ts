import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlSource = new BehaviorSubject<string>("about:blank");
  currentUrl = this.urlSource.asObservable();

  history : Array<string>;
  private historySource = new BehaviorSubject<Array<string>>([]);
  currentHistory = this.historySource.asObservable();

  constructor() {
    this.history = new Array();
  }

  setUrl(url: string) {
    this.urlSource.next(url);
    // todo: save link to history component
    this.history.push(url);
    this.historySource.next(this.history);
    // todo: save link to view compionent
  }
}
