import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomSetupDetailComponent } from './room-setup-detail.component';
import { PageTitleModule } from '../../page-title/page-title.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { ngfModule, ngf } from "angular-file";
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ngfModule,
    NgxSpinnerModule
  ],
  declarations: [RoomSetupDetailComponent],
  exports: [RoomSetupDetailComponent]
})
export class RoomSetupDetailModule { }
