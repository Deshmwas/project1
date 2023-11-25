

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MpesaService {
  private apiUrl = 'https://localhost:7256/api/Mpesa';

  constructor(private http: HttpClient) {}

  makePayment(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Mpesa/MakePayment`, {});
  }
}

