import { Injectable } from '@angular/core';
import { RequestService, AuthenticationService } from '../../core/services';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuestionSetService {
    header = null;
    constructor(private requestService: RequestService, private authenticationService: AuthenticationService, ) {
        // clear alert message on route change
    }

    getListQuestionSet(): Observable<any> {
        let uri = 'api/admin/get-combo-box-list-questions-set';
        let accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
            };
        }
        return this.requestService.get<any>(uri, this.header);
    }
    addNewQuestionSet(data): Observable<any> {
        let uri = 'api/admin/create-or-update-question-set';
        let accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
            };
        }
        return this.requestService.post<any>(uri, data, this.header);
    }
    deleteQuestionSet(id): Observable<any> {
        let uri = 'api/admin/delete-question-set?id=' + id;
        let accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
            };
        }
        return this.requestService.delete<any>(uri, this.header);
    }
}