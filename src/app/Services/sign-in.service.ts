import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const api_url ="https://localhost:7256/api/Users";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

   constructor(private httpClient: HttpClient) { }
   
   
  login(body: any): Observable<any>{
    return this.httpClient.post<any>(api_url + '/login', body, { responseType: 'json' });
  }
}
