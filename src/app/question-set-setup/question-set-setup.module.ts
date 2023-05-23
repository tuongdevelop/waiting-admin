import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionSetSetupComponent } from './question-set-setup.component';
import { PageTitleModule } from '../page-title/page-title.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuestionSetService } from './question-set-setup.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PageTitleModule,
    NgbModule,
    RouterModule,
    NgxSpinnerModule
  ],
  declarations: [QuestionSetSetupComponent],
  exports: [QuestionSetSetupComponent],
  providers: [QuestionSetService]
})
export class QuestionSetSetupModule { }
