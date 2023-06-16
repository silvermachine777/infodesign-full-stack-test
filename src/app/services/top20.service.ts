import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Top20 } from '../models/top20.model';
import { environment } from 'src/environments/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class Top20Service {
  
  private apiUrl = environment.apiUrlTop20;

  constructor(private http: HttpClient) { }

  getTop20(requestBody: any, headers?: HttpHeaders): Observable<ApiResponse<Top20[]>> {
    return this.http.post<ApiResponse<Top20[]>>(this.apiUrl, requestBody, { headers });
  }
}
