import { Injectable } from '@angular/core';
declare var splotsFactory: any;
@Injectable({
  providedIn: 'root'
})
export class SwipperService {
  private _swipper: any = splotsFactory;
  constructor() {
    // console.log(this._swipper)
  }

  onCreate() {
  }


}
