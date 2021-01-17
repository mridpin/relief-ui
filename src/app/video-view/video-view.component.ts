import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  viewUrl : SafeResourceUrl;
  url : string;

  constructor(private dataService : DataService, public sanitizer : DomSanitizer) { 
    this.url = "";  
    this.viewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnInit(): void {
    this.dataService.currentUrl.subscribe(url => {
      this.viewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.url = url;
    });
  }

}
