import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboadComponent } from './dashboad.component';
import { DasboadRoutingModule } from './dasboad-routing.module';
import { VerticalMenuModule } from '../vertical-menu/vertical-menu.module';
import { AuthGuard } from '../core/guard/auth.guard';
@NgModule({
  imports: [
    CommonModule,
    DasboadRoutingModule,
    VerticalMenuModule
  ],
  declarations: [DashboadComponent],
  providers: [AuthGuard],
})
export class DashboadModule { }
