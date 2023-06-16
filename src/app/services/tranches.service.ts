import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tranches } from '../models/tranches.model';
import { environment } from 'src/environments/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  status: number;
}


@Injectable({
  providedIn: 'root'
})
export class TranchesService {
  
  private apiUrl = environment.apiUrlByTranches;

  constructor(private http: HttpClient) { }

  getTranches(requestBody: any, headers?: HttpHeaders): Observable<ApiResponse<Tranches[]>> {
    return this.http.post<ApiResponse<Tranches[]>>(this.apiUrl, requestBody, { headers });
  }
}
