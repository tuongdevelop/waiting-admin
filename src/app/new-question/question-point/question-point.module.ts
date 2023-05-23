import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionPointComponent } from './question-point.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [QuestionPointComponent],
  exports: [QuestionPointComponent]
})
export class QuestionPointModule { }
