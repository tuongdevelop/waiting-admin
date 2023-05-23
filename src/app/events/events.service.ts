import { Injectable } from '@angular/core';
import { RequestService, AuthenticationService } from '../core/services';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    header = null;
    constructor(private requestService: RequestService, private authenticationService: AuthenticationService, ) {
        // clear alert message on route change
    }

    getListEvents(page, limit): Observable<any> {
        const uri = 'api/admin/get-list-events?page=' + page + '&limit=' + limit;
        const accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
            };
        }
        return this.requestService.get<any>(uri, this.header);
    }

    getMapSaleType(): Observable<any> {
        const uri = 'api/admin/get-map-on-sale-status';
        const accessToken = this.authenticationService.getAccessToken();
        if (accessToken) {
            this.header = {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
            };
        }
        return this.requestService.get<any>(uri, this.header);
    }
}
