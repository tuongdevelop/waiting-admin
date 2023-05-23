import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectSectionSetComponent } from './select-section-set.component';
import { ScrollbarModule } from 'ngx-scrollbar';
import { QuestionSetService } from './question-set.service';
import { NotificationService } from '../../core/services/notification.service';

@NgModule({
  imports: [
    CommonModule,
    ScrollbarModule,
    FormsModule
  ],
  declarations: [SelectSectionSetComponent],
  exports: [SelectSectionSetComponent],
  providers: [
    QuestionSetService,
    NotificationService
  ]
})
export class SelectSectionSetModule { }
