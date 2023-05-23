import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewQuestionComponent } from './preview-question.component';
import { QuestionTypeModule } from './question-type/question-type.module';
@NgModule({
  imports: [
    CommonModule,
    QuestionTypeModule
  ],
  declarations: [PreviewQuestionComponent],
  exports: [PreviewQuestionComponent],
  entryComponents: [PreviewQuestionComponent]
})
export class PreviewQuestionModule { }
