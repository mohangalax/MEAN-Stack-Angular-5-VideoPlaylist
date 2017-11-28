import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['video'],
  outputs: ['updateVideoEmit', 'deleteVideoEmit']
})
export class VideoDetailComponent implements OnInit {
  video: any;
  public updateVideoEmit = new EventEmitter();
  public deleteVideoEmit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  updateVideoDetail(){
    this.updateVideoEmit.emit(this.video);
  }

  deleteVideoDetail(){
    this.deleteVideoEmit.emit(this.video);
  }

}
