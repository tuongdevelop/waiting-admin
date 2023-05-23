import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalMenuComponent } from './vertical-menu.component';
import { Constant } from '../constant';
import { RouterModule } from '@angular/router';
import { ExpandModule } from '../shared/directive/expand/expand.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ExpandModule
  ],
  declarations: [
    VerticalMenuComponent
  ],
  exports: [VerticalMenuComponent],
  providers: [Constant],
})
export class VerticalMenuModule { }
