import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewQuestionSetComponent } from './new-question-set.component';
import { PageTitleModule } from '../page-title/page-title.module';
import { DropdownModule } from '../shared/dropdown/dropdown.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionSetService } from '../question-set-setup/question-set-setup.service';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    DropdownModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NewQuestionSetComponent],
  exports: [NewQuestionSetComponent],
  providers: [QuestionSetService]
})
export class NewQuestionSetModule { }
