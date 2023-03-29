import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, timeout } from 'rxjs';
import { Product } from './landing-page/product';
const api_url ="https://localhost:7256/api/Products";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl: any;
   apiUrl:  string = api_url;
  
  
  

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/search?query=${query}`)
    .pipe(catchError(this.handleError));
    console.log(this.search)
}

 private handleError(error: any) {
  let errorMessage: string;
  if (error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage); // throw an error as an Observable
}

}
