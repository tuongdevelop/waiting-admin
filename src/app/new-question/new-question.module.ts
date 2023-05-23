import { QuestionPointModule } from './question-point/question-point.module';
import { QuestionPictureModule } from './question-picture/question-picture.module';
import { QuestionTextModule } from './question-text/question-text.module';
import { PreviewQuestionModule } from './preview-question/preview-question.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewQuestionComponent } from './new-question.component';
import { PageTitleModule } from '../page-title/page-title.module';
import { DropdownModule } from '../shared/dropdown/dropdown.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    DropdownModule,
    NgbModule,
    QuestionPictureModule,
    QuestionPointModule,
    QuestionTextModule,
    PreviewQuestionModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxSpinnerModule
  ],
  declarations: [NewQuestionComponent],
  exports: [NewQuestionComponent]
})
export class NewQuestionModule { }
