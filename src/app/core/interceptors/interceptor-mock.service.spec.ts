import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterceptorMockService {
  private readonly baseUrl: string = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  fetchAll(): any {
    return this.http.get(this.baseUrl);
  }
}
