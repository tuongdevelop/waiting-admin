import { Component, OnInit } from '@angular/core';
import { Constant } from '../constant';
import { first } from 'rxjs/operators';
import { User } from '../core/models/user';
import * as moment from 'moment';
import { AuthenticationService } from '../core/services';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})

export class VerticalMenuComponent implements OnInit {
  public date;
  menuActive;
  currentUser: User;
  navbarOpen = false;

  constructor(
    public constant: Constant,
    private authenticationService: AuthenticationService
  ) {
    const loginUser = localStorage.getItem('currentUser');
    if (loginUser) {
      this.currentUser = JSON.parse(loginUser);
    }
  }

  ngOnInit() {
    this.date = this.getDateString();
  }

  getDateString() {
    const dateString = moment(new Date()).format('YYYY MMM DD');
    const timeString = moment(new Date()).format('h:mm:A');
    const dateOfWeek = moment(dateString, 'YYYY MMM DD').format('dddd');
    return dateString + ' ' + dateOfWeek + ' ' + timeString;
  }

  activeMenu(menu) {
    this.menuActive = menu;
  }

  logout() {
    this.authenticationService.logout();
  }

}
