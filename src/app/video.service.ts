import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Video } from './video';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService implements OnInit {

  private _getUrl = "/api/videos";
  private _postUrl = "/api/videos";
  private _putUrl = "/api/videos/";
  private _deleteUrl = "/api/videos/";

  constructor(private _http : Http) { }

  ngOnInit() {
  }

  getVideos() {
    return this._http.get(this._getUrl).map((response: Response) => response.json());
  }

  addVideo(video: Video) {
    let header = new Headers({'Content-Type': 'application/json'});
    let requestOptions = new RequestOptions({headers: header});
    return this._http.post(this._postUrl, JSON.stringify(video), requestOptions).
      map((response: Response) => response.json());
  }

  updateVideo(video: Video) {
    let header = new Headers({'Content-Type': 'application/json'});
    let requestOptions = new RequestOptions({headers: header});
    return this._http.put(this._putUrl + video._id, JSON.stringify(video), requestOptions).
      map((response: Response) => response.json());
  }

  deleteVideo(video: Video) {
    return this._http.delete(this._deleteUrl + video._id).
      map((response: Response) => response.json());
  }

}
