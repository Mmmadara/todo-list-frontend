import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/Item';

const ITEM_API = 'http://localhost:8085/api/item/';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  editPost(postId: number, items: Item[]): Observable<any> {
    return this.http.post(ITEM_API + 'editItems/' + postId, items);
  }

  getPostItems(postId: number): Observable<any> {
    return this.http.get(ITEM_API + 'getItems/' + postId);
  }
}
