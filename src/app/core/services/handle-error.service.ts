import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { throwError as observableThrowError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private notificationService: NotificationService) { }

  public handleError(error: any) {

    let message: string;
    if (error instanceof HttpErrorResponse) {
      message = `${error.status} - ${error.statusText || ''}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    this.notificationService.printErrorMessage(error.message);
    // console.log('LOG ERROR: ', error);
    return observableThrowError(message);
  }
}
