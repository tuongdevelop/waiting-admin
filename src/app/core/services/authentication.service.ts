import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { RequestService } from './request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private requestSVC: RequestService,
    private router: Router
    ) { }
  login(username: string, password: string) {
    const baseURL = environment.API_BASE_URL;

    const uri = `${baseURL}api/admin/oauth/token`;
    const body = new HttpParams({
      fromObject : {
        'grant_type' : 'password',
        'username' : username,
        'password' : password,
        'resource_ids' : 'waiting-system-api'
      }
    });
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic d2FpdGluZ1N5c3RlbU1vYmlsZTpHMllXdERxRFM5RXg3NXRBbXVrdw==');
    return this.http.post<any>(uri, body.toString(), {headers})
      .pipe(
        map((user: any) => {
        if (user && user.access_token) {
          user.username = username;
          this.setCurrentUser(JSON.stringify(user));
        }
        return user;
      }));
  }

  refresh() {
    const baseURL = environment.API_BASE_URL;
    const refresh_token = this.getRefreshToken();
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refresh_token);
    const uri_refresh = `${baseURL}api/admin/oauth/token`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic d2FpdGluZ1N5c3RlbU1vYmlsZTpHMllXdERxRFM5RXg3NXRBbXVrdw==');
    return this.http.post<any>(uri_refresh, body.toString(), { headers })
      .pipe(map(user => {
        if (user && user.access_token) {
            this.setCurrentUser(user);
        }
        return user;
      }));
  }

  private _logout() {
    const refresh_token = this.getRefreshToken();
    const uri = `api/logout?refresh_token=${refresh_token}`;

    const access_token: any = this.getAccessToken();
    let params = null;
    if (access_token) {

      params = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${access_token}`
        })
      };
    }

    return this.requestSVC.get<any>(uri, params);
  }

  error(error: any) {
    let message: string;
    if (error instanceof HttpErrorResponse) {
      message = `${error.status} - ${error.statusText || ''}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    return message;
  }

  logout() {
    this._logout().subscribe((res) => {
      this.setCurrentUser(null);
      this.router.navigateByUrl('login');
    }, (error) => {
      this.setCurrentUser(null);
      this.router.navigateByUrl('login');
    });
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem('currentUser');
    } else {
      localStorage.setItem('currentUser', user);
    }
  }

  getCurrentUser() {
    let user: any = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      return user;
    }
    return null;
  }
  getAccessToken() {
    let user: any = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      return user.access_token;
    }
    return null;
  }

  getRefreshToken() {
    let user: any = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      return user.refresh_token;
    }
    return null;
  }
}
