import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  base_url = 'https://inventory-manager98.herokuapp.com';
  constructor(private http: HttpClient) {}

  post(url: string, payload: any) {
    return this.http.post(this.base_url + url, payload);
  }
}
