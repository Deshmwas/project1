import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

   private baseUrl = 'api/requests'; 

  constructor(private http: HttpClient) { }

  getPendingRequests(): Observable<Request[]> {
    const url = `${this.baseUrl}/pending`;
    return this.http.get<Request[]>(url);
  }

  approveRequest(requestId: number): Observable<void> {
    const url = `${this.baseUrl}/${requestId}/approve`;
    return this.http.put<void>(url, null);
  }

  rejectRequest(requestId: number): Observable<void> {
    const url = `${this.baseUrl}/${requestId}/reject`;
    return this.http.put<void>(url, null);
  }
}
