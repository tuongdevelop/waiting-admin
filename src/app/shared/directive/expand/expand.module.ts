import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandDirective } from './expand.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ExpandDirective
  ],
  exports: [ExpandDirective]
})
export class ExpandModule { }
