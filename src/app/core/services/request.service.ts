import { environment } from '../../../environments/environment';
import { throwError as observableThrowError, Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public get<T>(path: string, params?: any, decoder?): Observable<T> {
    const uri = this.uri(path);
    const options = this.options(params);
    return this.http.get(uri, options).pipe(catchError(this.error), map(this.receive(decoder)));
  }

  public post<T>(path: string, data?, params?: any, decoder?): Observable<T> {
    const uri = this.uri(path);
    const options = this.options(params);
    return this.http.post(uri, data, options).pipe(catchError(this.error), map(this.receive(decoder)));
  }

  public patch<T>(path: string, data, params?: any, decoder?): Observable<T> {
    const uri = this.uri(path);
    const options = this.options(params);
    return this.http.patch(uri, data, options).pipe(catchError(this.error), map(this.receive(decoder)));
  }

  public put<T>(path: string, data, params?: any, decoder?): Observable<T> {
    const uri = this.uri(path);
    const options = this.options(params);
    return this.http.put(uri, data, options).pipe(catchError(this.error), map(this.receive(decoder)));
  }

  public delete<T>(path: string, params?: any): Observable<T> {
    const uri = this.uri(path);
    const options = this.options(params);
    return this.http.delete(uri, options).pipe(catchError(this.error), map(this.receive()));
  }

  public uri(uri: string): string {
    const regexp = /^https?:\/\//i;
    if (!regexp.test(uri)) {
      return `${environment.API_BASE_URL}${uri}`;
    }
    return uri;
  }

  private options(params?: {}): {} {
    let headers = null;
    if (params && 'headers' in params) {
      headers = params['headers'];
    }
    if (!headers) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    const options = { headers: headers, withCredentials: false };
    if (params && Object.keys(params).length > 0) {
      delete params['headers'];
      options['params'] = params;
    }
    return options;
  }

  private receive(decoder?) {
    if (decoder) {
      return decoder;
    } else {
      return this.extract;
    }
  }

  private extract(result: any) {
    return result;
  }

  private error(error: any) {
    let message: string;
    if (error && error.status === 401) {
      localStorage.removeItem('currentUser');
    }
    if (error instanceof HttpErrorResponse) {
      message = `${error.status} - ${error.statusText || ''}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    // console.log('LOG ERROR: ', error);
    return observableThrowError(message);
  }
}
