import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

 const api_url ="https://localhost:7256/api/Users";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(public httpclient: HttpClient) { }


  register(body: any): Observable<any> {
  return this.httpclient.post<any>(api_url + '/register', body)
    .pipe(
      catchError(error => {
        // handle error here
        console.log(error);
        return throwError(error);
      })
    );
}
}
