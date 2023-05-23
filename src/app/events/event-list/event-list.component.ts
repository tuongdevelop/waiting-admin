import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input()
  eventList;

  @Input()
  saleType;

  constructor() { }

  ngOnInit() {
  }

  standardSaleType(lower: string) {
    if (lower) {
      let words = lower.replace('_', ' ');
      words = words.replace(/\b\w/g, function(l) { return l.toUpperCase(); } );
      return words;
    }
    return '';
  }
}
