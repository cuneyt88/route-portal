import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { RouteInfo } from './route-info.model';
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  [x: string]: any;

  constructor(private http: HttpClient) { }


  public getRoutes(): Observable<RouteInfo[]> {
    const url = 'http://localhost:8071/routes/get';

    return this.http.get<RouteInfo[]>(url);
  }

}
