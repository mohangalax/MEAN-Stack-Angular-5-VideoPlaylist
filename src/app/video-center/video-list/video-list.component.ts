import { Component, OnInit, EventEmitter } from '@angular/core';
import { Video } from '../../video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs: ['selectedVid']
})
export class VideoListComponent implements OnInit {

  public selectedVid = new EventEmitter();
  constructor() { }
  
  ngOnInit() {
  }

  selectedVideo(video: Video) {
    this.selectedVid.emit(video);
  }

}
