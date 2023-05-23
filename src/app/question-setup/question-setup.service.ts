import { Injectable } from '@angular/core';
import { RequestService, AuthenticationService } from '../core/services';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class QuestionSetupService {
    header = null;
    constructor(
        private requestService: RequestService,
        private authenticationService: AuthenticationService) {}

    getheader() {
        const accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
               headers: new HttpHeaders({'Authorization': `Bearer ${accessToken}`})
             };
             return this.header;
        }
    }

    deleteQuestion(ids) {
        const uri = `api/admin/delete-list-questions?ids=${ids}`;
        return this.requestService.delete<any>(uri, this.getheader());
    }

    getListQuestions(page, limit): Observable<any> {
        const uri = 'api/admin/get-list-questions?page=' + page + '&limit=' + limit;
        return this.requestService.get<any>(uri, this.getheader());
    }

    updateQuestionsStatus(ids, states) {
        const formData: FormData = new FormData();
        // formData.append('questionStatus', status);
        formData.append('states', states);
        ids.forEach(element => {
            formData.append('ids', element);
        });

        const uri = `api/admin/update-status-list-questions`;
        return this.requestService.put<any>(uri, formData, this.getheader());
    }

}
