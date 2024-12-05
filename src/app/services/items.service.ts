import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Item } from '../../app/interfaces/item.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:8000/api/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}`).pipe(
      map(items => items.map(item => ({
        ...item,
        price: Number(item.price)
      })))
    );
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`).pipe(
      map(item => ({
        ...item,
        price: Number(item.price)
      }))
    );
  }

  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
