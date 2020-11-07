import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productId: string = '2niD4Nn83P7R4wXerqSx';
  apiUrl: string = 'http://us-central1-test-b7665.cloudfunctions.net/api';
  storeId: string = 'ijpxNJLM732vm8AeajMR';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createProduct(data): Observable<any> {
    var API_URL = `${this.apiUrl}/stores/${this.storeId}/products`;
    return this.http.post(API_URL, data, { headers: this.headers, responseType: 'text' }).pipe(
        catchError(this.error)
    )
  }

  // Read
  readProduct(id) {
    // console.log('l☯☯☯l > StoreService > readStore() > bodyOrder: ', this.apiUrl);
    return this.http.get(`${this.apiUrl}/stores/${this.storeId}/products/${id}`, { headers: this.headers });
  }

  // Delete
  deleteProduct(id): Observable<any> {
    // var API_URL = `${this.apiUrl}/delete-task/${id}`;
    var API_URL = `${this.apiUrl}/stores/${this.storeId}/products/${id}`;
    console.log('l☯☯☯l > StoreService > deleteProduct() > API_URL: ', API_URL);
    return this.http.delete(API_URL).pipe(
      catchError(this.error)
    )
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
