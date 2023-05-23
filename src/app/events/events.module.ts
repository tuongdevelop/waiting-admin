import { EventListModule } from './event-list/event-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from '../page-title/page-title.module';
import { RouterModule } from '@angular/router';
import { EventsService } from './events.service';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    EventListModule,
    RouterModule,
    NgbModule
  ],
  declarations: [EventsComponent],
  exports: [EventsComponent],
  providers: [EventsService]
})
export class EventsModule { }
