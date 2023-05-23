import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input()
  placeholder: string;

  @Input()
  data;

  @Input()
  isDefault;

  @Input()
  editSelected;

  @Output()
  item: EventEmitter<any> = new EventEmitter();

  constructor() { }
  itemSelected;
  isActive = false;

  ngOnInit() {
    setTimeout(() => {
      this.checkIsDefault();
    }, 200);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
  }

  checkIsDefault() {
    if (this.editSelected) {
      this.itemSelected = this.editSelected;
      if (this.itemSelected === 'swipe_mission') {
        this.placeholder = 'Swipe Mission';
      } else if (this.itemSelected === 'artist_name') {
        this.placeholder = 'Artist Name';
      } else if (this.itemSelected === 'physics_water') {
        this.placeholder = 'Physics: Water';
      }
    } else {
      if (this.isDefault) {
        this.placeholder = this.data[0].name;
        this.itemSelected = this.data[0].id;
        if (this.data[0].image) {
          this.placeholder = '<img src="' + this.data[0].image + '"/> : ' + this.data[0].name;
        }
      }
    }
  }

  selectedItem(item) {
    this.placeholder = item.name;
    this.itemSelected = item.id;
    if (item.image) {
      this.placeholder = '<img src="' + item.image + '"/> : ' + item.name;
    }
    this.isActive = false;
    this.item.emit(item);
  }

  openDropdown() {
    this.isActive = !this.isActive;
  }

}
