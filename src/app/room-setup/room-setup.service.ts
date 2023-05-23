import { Injectable } from '@angular/core';
import { RequestService, AuthenticationService } from '../core/services';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomSetupService {

  constructor(
    public requestService:  RequestService, private authenticationService: AuthenticationService
  ) { }

  getListEventSettings(page, limit): Observable<any> {
    const uri = 'api/admin/get-list-event-settings?page=' + page + '&limit=' + limit;
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`})
      };
    }
    return this.requestService.get<any>(uri, params);
  }

  getListQuestionSets(): Observable<any> {
    // const uri = 'api/admin/get-list-questions-set';
    const uri = 'api/admin/get-combo-box-list-questions-set';
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`})
      };
    }
    return this.requestService.get<any>(uri, params);
  }

  getEventSettingDetail(eventId, saleId): Observable<any> {
    const uri = 'api/admin/get-event-setting?eventId=' + eventId + '&saleId=' + saleId;
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`})
      };
    }
    return this.requestService.get<any>(uri, params);
  }

  updateEventSetting(data): Observable<any> {
    const uri = 'api/admin/update-event-setting';
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`})
      };
    }
    return this.requestService.post<any>(uri, data, params);
  }

  uploadPosterImage(eventId, saleId, posterImageUpload): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('eventId', eventId);
    formData.append('saleId', saleId);
    formData.append('posterImageUpload', posterImageUpload);

    const uri = 'api/admin/upload-poster-image';
    const accessToken = this.authenticationService.getAccessToken();
    let params = null;
    if (accessToken) {
      params = {
        headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`})
      };
    }
    return this.requestService.post<any>(uri, formData, params);
  }
}
