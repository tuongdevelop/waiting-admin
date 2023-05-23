import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaterangePickerComponent } from './daterange-picker.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [DaterangePickerComponent],
  exports: [DaterangePickerComponent]
})
export class DaterangePickerModule { }
