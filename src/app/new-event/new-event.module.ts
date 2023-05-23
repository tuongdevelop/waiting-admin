import { DaterangePickerModule } from './../shared/daterange-picker/daterange-picker.module';
import { TimePickerModule } from './../shared/time-picker/time-picker.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEventComponent } from './new-event.component';
import { PageTitleModule } from '../page-title/page-title.module';
import { DropdownModule } from '../shared/dropdown/dropdown.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ngfModule, ngf } from 'angular-file';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    DropdownModule,
    NgbModule,
    ngfModule,
    TimePickerModule,
    FormsModule,
    DaterangePickerModule,
    RouterModule,
  ],
  declarations: [NewEventComponent],
  exports: [NewEventComponent]
})
export class NewEventModule { }
