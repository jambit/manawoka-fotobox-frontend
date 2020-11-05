import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SocialMediaContent} from '../models/SocialMediaContent';

const BASE_URL = 'http://localhost:8080/api/v1/photobox';
const DOCKER_URL = 'http://localhost/images';


@Injectable({
  providedIn: 'root'
})
export class PhotoboothService {

  constructor(private http: HttpClient) {
  }

  takePhoto() {
    return this.http.get(`${BASE_URL}/picture`);
  }

  deletePhoto() {
    return this.http.delete(`${BASE_URL}/delete`);
  }

  deleteEditedPhoto() {
    return this.http.delete(`${BASE_URL}/delete/edited`);
  }

  getTakenPhoto(): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>(`${BASE_URL}/latest`, {headers, responseType: 'text' as 'json'});
  }

  getEditedPhoto(): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>(`${BASE_URL}/latest/edited`, {headers, responseType: 'text' as 'json'});
  }

  postPhotoToTwitter(content: SocialMediaContent) {
    return this.http.post(`${BASE_URL}/createTweet`, content);
  }

  postPhotoToLinkedIn(content: any) {
    // TODO Refactor LinkedIn
    return this.http.post(BASE_URL, content);
  }

  toggleKeyboard(status: string) {
    return this.http.post(`${BASE_URL}/keyboard`, status);
  }

}
