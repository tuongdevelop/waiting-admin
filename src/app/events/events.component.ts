import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public pageTitle = 'All Events';
  public breadcrumb = 'Home\\ All Events \\';
  public eventList: any = [];
  paging = {
    page: 0,
    total: 0,
    pageSize: 10,
    maxSize: 0
  };
  alive = true;
  saleType: any = {};

  constructor(
    private eventService: EventsService) { }

  ngOnInit() {

    this.getListEvents(0);
  }

  getListEvents(page) {
    this.eventService.getListEvents(page, this.paging.pageSize)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.eventList = result.data.results;
        this.paging.total = result.data.totalItems;
        this.paging.maxSize = result.data.totalPage;
      }, (error) => {
      });
  }
  getMapSaleType() {
    this.eventService.getMapSaleType()
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.saleType = result.data;
      }, (_error) => {
      });
  }

  pageChange(event) {
    this.getListEvents(event - 1);
  }

}
