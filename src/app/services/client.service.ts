import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from 'src/environments/environment';


interface ApiResponse<T> {
  success: boolean;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  private apiUrl = environment.apiUrlByClient;

  constructor(private http: HttpClient) { }

  getClients(requestBody: any, headers?: HttpHeaders): Observable<ApiResponse<Client[]>> {
    return this.http.post<ApiResponse<Client[]>>(this.apiUrl, requestBody, { headers });
  }
}
