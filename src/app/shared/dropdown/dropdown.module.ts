import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { ScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    ScrollbarModule
  ],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})
export class DropdownModule { }
