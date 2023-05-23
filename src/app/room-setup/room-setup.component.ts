import { Component, OnInit } from '@angular/core';
import { RoomSetupService } from './room-setup.service';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-room-setup',
  templateUrl: './room-setup.component.html',
  styleUrls: ['./room-setup.component.scss']
})

export class RoomSetupComponent implements OnInit {
  public pageTitle = 'Waiting Room Setup';
  public breadcrumb = 'Home \\ Waiting Room Setup \\ ';

  eventWatingList: any = null;
  paging = {
    page: 0,
    total: 0,
    pageSize: 10,
    maxSize: 0
  };
  alive = true;

  constructor(
    private roomSetupService: RoomSetupService,
    private authenService: AuthenticationService,
    private router: Router
    ) {}

  ngOnInit() {
    if (!this.authenService.isAuthenticated()) {
      this.router.navigateByUrl('login');
    }
    this.getListEvent(0);
  }

  getListEvent(page) {
    this.roomSetupService.getListEventSettings(page, this.paging.pageSize)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.eventWatingList = result.data.results;
        // Set paging
        this.paging.total = result.data.totalItems;
        this.paging.maxSize = result.data.totalPage;
      }, (error) => {
        this.authenService.logout();
    });
  }

  goDetail(eventId, saleId) {
    this.router.navigateByUrl('room-setup/' + eventId + '?saleId=' + saleId);
  }

  loadPage(page: number) {
    page = page - 1;
    this.getListEvent(page);
  }

  toCapitalize(lower: string) {
    if (lower) {
      const result = lower.charAt(0).toUpperCase() + lower.substr(1);
      return result;
    }
    return '';
  }

  standardSaleType(lower: string) {
    if (lower) {
      let words = lower.replace('_', ' ');
      words = words.replace(/\b\w/g, function(l) { return l.toUpperCase(); });
      return words;
    }
    return '';
  }
}
