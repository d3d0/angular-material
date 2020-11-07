import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  apiUrl: string = 'http://us-central1-test-b7665.cloudfunctions.net/api';
  storeId: string = 'ijpxNJLM732vm8AeajMR';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Read
  readStore() {
    // console.log('l☯☯☯l > StoreService > readStore() > bodyOrder: ', this.apiUrl);
    return this.http.get(`${this.apiUrl}/stores/${this.storeId}`, { headers: this.headers });
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
