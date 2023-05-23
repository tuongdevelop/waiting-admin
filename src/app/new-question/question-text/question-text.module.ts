import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionTextComponent } from './question-text.component';
import { ngfModule, ngf } from 'angular-file';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ngfModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [QuestionTextComponent],
  exports: [QuestionTextComponent]
})
export class QuestionTextModule { }
