import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './../landing-page/product';
import { DomSanitizer } from '@angular/platform-browser';


const api_url ="https://localhost:7256/api/Products/";


@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
 
 
  imageUrl: any;
  apiUrl:  string = api_url;
  apiEndpoint: any;
 addProduct(product: Product): Observable<Product> {
  const formData = new FormData();
  
  // Append product properties to FormData object
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price ? product.price.toString() : '');
  formData.append('userEmail', product.userEmail);
  
  // Append image to FormData object if it exists
  if (product['imageData']) {
    formData.append('image', product['imageData']);
  }
  
  return this.http.post<Product>(api_url, formData).pipe(
    catchError((error: any) => throwError(error))
  );
}


  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }

 getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(api_url).pipe(
    map((products: any[]) => products.map(product => ({
      ...product,
      imageData: product.imageData,
      imageUrl: product.imageData ? `https://localhost:7256/api/Products/images/${product.imageData}` : null,
      isLoading: false
    }))),
    catchError((error: any) => throwError(error))
  );
}

  
  getProductById(id:any): Observable<any>{
    return this.http.get<any>(api_url + '/' + id);
  }
updateProduct(product: Product): Observable<Product> {
  const url = `${api_url}${product.id}`;

  const formData = new FormData();
  formData.append('id',product.id);
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price ? product.price.toString() : '');

  if (product['imageData']) {
    formData.append('image', product['imageData']);
  }

  return this.http.put<Product>(url, formData).pipe(
    catchError((error: any) => throwError(error))
  );
}



  
   getImage(imageUrl: string): Observable<Blob> {
    const url = `${this.apiUrl}/images/${imageUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'image/png',
      'Accept': 'image/png'
    });
    return this.http.get(url, { responseType: 'blob', headers });
  }
 deleteProduct(id: any): Observable<any> {
  const url = `${this.apiUrl}${id}`;
  return this.http.delete(url).pipe(
    catchError((error: any) => {
      console.error(error);
      return throwError(error);
    })
  );
}






}


  

