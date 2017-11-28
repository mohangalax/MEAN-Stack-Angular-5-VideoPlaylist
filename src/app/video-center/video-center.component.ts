import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Video } from '../video';

@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>;

  selectedVideo: Video;

  newVideoSection: boolean = false;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe(responseVideo => this.videos = responseVideo);
  }

  selectedVid(video: any) {
    this.selectedVideo = video;
    this.newVideoSection = false;
  }

  showNewVideoSection() {
    this.newVideoSection = true;
    this.selectedVideo = null;
  }

  submitNewVideo(video: Video) {
    console.log(video);
    this.videoService.addVideo(video).subscribe(responseNewVideo => {
        this.newVideoSection = false;
        this.videos.push(responseNewVideo);
        this.selectedVideo = responseNewVideo;
      }
    );
  }

  onUpdateVideoEvent(video: any) {
    this.videoService.updateVideo(video).subscribe(responseUpdateVideo => video = responseUpdateVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this.videoService.deleteVideo(video).subscribe(responseDeleteVideo => {
        for(let i=0; i < videoArray.length; i++) {
          if(videoArray[i]._id == video._id) {
            videoArray.splice(i, 1);
          }
        }
      }
    );
    this.selectedVideo = null;
  }

}
