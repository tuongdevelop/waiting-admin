import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionTypeComponent } from './question-type.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [QuestionTypeComponent],
  exports: [QuestionTypeComponent]
})
export class QuestionTypeModule { }
