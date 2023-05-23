import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionPictureComponent } from './question-picture.component';
import { ngfModule, ngf } from 'angular-file';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ngfModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [QuestionPictureComponent],
  exports: [QuestionPictureComponent]
})
export class QuestionPictureModule { }
