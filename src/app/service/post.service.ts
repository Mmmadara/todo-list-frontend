import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

const POST_API = 'http://localhost:8085/api/post/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(name: string): Observable<any> {
    let post: Post = {
      name: name
    }
    return this.http.post(POST_API + 'create', post);
  }

  getAllActivePosts(): Observable<any> {
    return this.http.get(POST_API + 'getAllActivePosts');
  }

  getAllNotActivePosts(): Observable<any> {
    return this.http.get(POST_API + 'getAllNotActivePosts');
  }

  activatePost(postId: number): Observable<any> {
    return this.http.post(POST_API + 'activatePost/' + postId, null);
  }

  deactivatePost(postId: number): Observable<any> {
    return this.http.post(POST_API + 'deactivatePost/' + postId, null);
  }


  delete(postId: number): Observable<any> {
    return this.http.post(POST_API + 'delete/' + postId, null);
  }
}
