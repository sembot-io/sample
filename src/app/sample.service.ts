import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_BASE__URL = 'https://reqres.in/api';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  constructor(private http: HttpClient) {}

  getUersList(page: number = 0): Observable<any> {
    return this.http.get<any>(`${API_BASE__URL}/users?page=${page}`);
  }

  getUserData(userId: number): Observable<any> {
    return this.http.get<any>(`${API_BASE__URL}/users/${userId}`);
  }

  getSampleResources(): Observable<any> {
    return this.http
      .get<any>(`${API_BASE__URL}/unknow`)
      .pipe(map((res) => res.data));
  }
}
