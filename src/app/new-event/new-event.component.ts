import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  public pageTitle = 'New Event';
  public breadcrumb = 'Home\\ All Events \\ New Event';

  placeholder = 'Arena, AsiaWorld-Expo';
  data = [
    {
      id: '1',
      name: 'Arena, AsiaWorld-Expo'
    },
    {
      id: '2',
      name: 'Arena, AsiaWorld-Expo 1'
    },
    {
      id: '3',
      name: 'Arena, AsiaWorld-Expo 2'
    },
    {
      id: '4',
      name: 'Arena, AsiaWorld-Expo 3'
    }
  ];
  placeholderTailorQues = 'MAMAMO';
  dataTailorQues = [
    {
      id: '1',
      name: 'MAMAMO'
    }
  ];
  checkedItem;
  event_date: any;
  placeholderStartTime = 'Start Time';
  placeholderSaleTime = 'Start Time';
  placeholderPostpone = 'Postpone Time';
  placeholderPBooking = '--';

  accept = 'image/*';
  file: File = null;

  constructor() { }

  ngOnInit() {
  }

  itemSelected(e) {
    this.checkedItem = e.id;
  }
}
