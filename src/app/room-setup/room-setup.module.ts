import { RoomSetupService } from './room-setup.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomSetupComponent } from './room-setup.component';
import { PageTitleModule } from '../page-title/page-title.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    NgbModule,
    RouterModule,
    NgxSpinnerModule
  ],
  declarations: [RoomSetupComponent],
  exports: [RoomSetupComponent],
  providers: [RoomSetupService]
})
export class RoomSetupModule { }
