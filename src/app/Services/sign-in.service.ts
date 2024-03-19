import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';


const api_url ="https://localhost:7256/api/Users";

@Injectable({
  providedIn: 'root'
})
export class SignInService {
 

   constructor(private httpClient: HttpClient) { }
   
   
  login(body: any): Observable<any>{
  return this.httpClient.post<any>(api_url + '/login', body, { responseType: 'json' })
    .pipe(
      catchError(error => {
        // handle error response from backend
        if (error.error && error.error.message) {
          return throwError(error.error.message);
        }
        return throwError('An error occurred while logging in. Please try again later.');
      })
    );
}
isLoggedIn(): Observable<boolean> {
    // Make a request to your backend to check if the user is logged in
    // Replace the following line with the actual endpoint or logic
    return this.httpClient.get<any>(api_url + '/isLoggedIn').pipe(
      map((response: { isLoggedIn: boolean; }) => {
        // Assuming your backend returns a boolean indicating whether the user is logged in
        return response?.isLoggedIn === true;
      }),
      catchError(error => {
        console.error('Error checking if user is logged in:', error);
        return throwError(false); // Assume not logged in on error
      })
    );
  }
}
