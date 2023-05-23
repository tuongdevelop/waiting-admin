import { Injectable } from '@angular/core';
import { RequestService, AuthenticationService } from '../core/services';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetService {

  constructor(
    private requestSVC: RequestService,
    private authenticationService: AuthenticationService
  ) {
  }

  getListQuestionSet(page, limit, keySearch?): Observable<any> {
    let uri = 'api/admin/get-list-questions-set?page=' + page + '&limit=' + limit;
    if (keySearch) {
      uri = 'api/admin/get-list-questions-set?page=' + page + '&limit=' + limit + '&keySearch=' + keySearch;
    }
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {

      params = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      };
    }

    return this.requestSVC.get<any>(uri, params);
  }

  getDetailQuestionSet(id): Observable<any> {
    const uri = 'api/admin/get-question-set-by-id?id=' + id;
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {

      params = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      };
    }

    return this.requestSVC.get<any>(uri, params);
  }

  addNewQuestionSet(data): Observable<any> {
    const uri = 'api/admin/create-or-update-setting-question-set';
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      };
    }
    return this.requestSVC.post<any>(uri, data, params);
  }

  deleteQuestionSet(id): Observable<any> {
    const uri = 'api/admin/delete-question-set?id=' + id;
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      };
    }
    return this.requestSVC.delete<any>(uri, params);
  }

  updateQuestionSetStates(id, status) {
    const formData: FormData = new FormData();
    formData.append('states', status);
    formData.append('id', id);

    const uri = `api/admin/update-status-question-set`;

    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      };
    }
    return this.requestSVC.put<any>(uri, formData, params);
  }
}
