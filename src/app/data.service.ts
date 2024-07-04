import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getRequest(params: any): Observable<any> {
    const finalUrl = this.buildUrl(this.url,params);
    return this.http.get<any>(finalUrl);
  }

  buildUrl(base: string, params: { [key: string]: any }): string {
    const url = new URL(base);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
  }
}
