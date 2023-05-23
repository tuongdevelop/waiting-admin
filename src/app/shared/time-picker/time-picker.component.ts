import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [NgbDropdownConfig]
})
export class TimePickerComponent implements OnInit {
  @Input()
  placeholder: string;

  timePicker: any;
  timeValue: string;

  constructor(config: NgbDropdownConfig) {
    config.autoClose =  'outside';
  }

  ngOnInit() {
  }

  setValueTime() {
    if (!this.timePicker) {
      this.timePicker = {hour: 10, minute: 30};
      this.timeValue = this.timePicker.hour + ':' + this.timePicker.minute;
    }
  }

  fireOnChange(newTime) {
    this.timeValue = newTime.hour + ':' + newTime.minute;
  }
}
