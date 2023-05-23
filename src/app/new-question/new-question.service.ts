import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestService, AuthenticationService } from '../core/services';

@Injectable({
    providedIn: 'root'
})
export class NewQuestionService {
    public firstAnswer: string;
    public secondAnswer: string;
    public thirdAnswer: string;
    public fourthAnswer: string;
    // public questionStatus: string;
    public states: string;
    public answerTextAlign: string;
    public correctAnswer: any = [];
    header = null;
    constructor(private http: HttpClient, private requestService: RequestService, private authenticationService: AuthenticationService) {

    }

    getheader() {
        const accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
            };
            return this.header;
        }
    }

    postNewQuestion(obj) {
        const baseURL = environment.API_BASE_URL;
        const uri = `${baseURL}api/admin/create-or-update-question`;
        const formData: FormData = new FormData();

        if (obj.firstAnswer) {
            this.firstAnswer = 'first';
        }
        if (obj.secondAnswer) {
            this.secondAnswer = 'second';
        }
        if (obj.thirdAnswer) {
            this.thirdAnswer = 'third';
        }
        if (obj.fourthAnswer) {
            this.fourthAnswer = 'fourth';
        }
        // this.questionStatus = obj.questionStatus ? 'enable' : 'disabled';
        this.states = obj.states ? 'enable' : 'disable';
        // this.answerTextAlign = obj.questionStatus ? 'left' : 'center';
        this.answerTextAlign = obj.states ? 'left' : 'center';
        if (obj.id) {
            formData.append('id', obj.id);
        }
        if (obj.questionPicUpload) {
            formData.append('questionPicUpload', obj.questionPicUpload, obj.questionPicUpload.name);
        }
        if (obj.answerPicFirstUpload) {
            formData.append('answerPicFirstUpload', obj.answerPicFirstUpload, obj.answerPicFirstUpload.name);
        }
        if (obj.answerPicSecondUpload) {
            formData.append('answerPicSecondUpload', obj.answerPicSecondUpload, obj.answerPicSecondUpload.name);
        }
        if (obj.answerPicThirdUpload) {
            formData.append('answerPicThirdUpload', obj.answerPicThirdUpload, obj.answerPicThirdUpload.name);
        }
        if (obj.answerPicFourthUpload) {
            formData.append('answerPicFourthUpload', obj.answerPicFourthUpload, obj.answerPicFourthUpload.name);
        }
        // if (this.questionStatus) {
        if (this.states) {
            // formData.append('questionStatus', this.questionStatus);
            formData.append('states', this.states);
        }
        if (obj.questionEn) {
            formData.append('questionEn', obj.questionEn);
        }
        if (obj.questionCh) {
            formData.append('questionCh', obj.questionCh);
        }

        if (obj.questionType) {
            formData.append('questionType', obj.questionType);
        }
        if (obj.questionSetId) {
            formData.append('questionSetId', obj.questionSetId);
        }

        formData.append('answerTextFirst', obj.answerTextFirst || '');
        formData.append('answerTextSecond', obj.answerTextSecond || '');
        formData.append('answerTextThird', obj.answerTextThird || '');
        formData.append('answerTextFourth', obj.answerTextFourth || '');

        if (this.firstAnswer) {
            formData.append('correctAnswer', this.firstAnswer);
        }
        if (this.secondAnswer) {
            formData.append('correctAnswer', this.secondAnswer);
        }

        if (this.thirdAnswer) {
            formData.append('correctAnswer', this.thirdAnswer);
        }
        if (this.fourthAnswer) {
            formData.append('correctAnswer', this.fourthAnswer);
        }
        if (this.answerTextAlign) {
            formData.append('answerTextAlign', this.answerTextAlign);
        }
        return this.http.post<any>(uri, formData, this.getheader())
            .pipe(map(question => {
                return question;
            }));


    }

    getQuestionByID(id) {
        const baseURL = environment.API_BASE_URL;
        const uri = `${baseURL}api/admin/get-question-by-id?id=${id}`;
        return this.http.get<any>(uri, this.getheader())
            .pipe(map(question => {
                return question;
            }));

    }

    postNewQuestionSwipe(data) {
        const baseURL = environment.API_BASE_URL;
        const uri = `${baseURL}api/admin/create-or-update-question-swipe`;

        return this.http.post<any>(uri, data, this.getheader())
            .pipe(map(question => {
                return question;
            }));
    }

}
