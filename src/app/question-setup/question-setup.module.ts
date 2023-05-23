import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetupComponent } from './question-setup.component';
import { PageTitleModule } from '../page-title/page-title.module';
import { SelectSectionSetModule } from './select-section-set/select-section-set.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PageTitleModule,
    SelectSectionSetModule,
    NgbModule,
    RouterModule
  ],
  declarations: [QuestionSetupComponent],
  exports: [QuestionSetupComponent]
})
export class QuestionSetupModule { }
