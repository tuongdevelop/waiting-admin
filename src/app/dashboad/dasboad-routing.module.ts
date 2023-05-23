import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewQuestionComponent } from '../new-question/new-question.component';
import { NewQuestionSetComponent } from '../new-question-set/new-question-set.component';
import { QuestionSetupComponent } from '../question-setup/question-setup.component';
import { RoomSetupComponent } from '../room-setup/room-setup.component';
import { QuestionSetSetupComponent } from '../question-set-setup/question-set-setup.component';
import { RoomSetupDetailComponent } from '../room-setup/room-setup-detail/room-setup-detail.component';
import { AllSellingComponent } from '../all-selling/all-selling.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { EventsComponent } from '../events/events.component';
import { NewEventComponent } from '../new-event/new-event.component';
import { DashboadComponent } from './dashboad.component';
import { AuthGuard } from '../core/guard/auth.guard';
const routes: Routes = [
  {
    path: '', component: DashboadComponent,
    children: [
      {
        path: 'new-question', component: NewQuestionComponent, canActivate: [AuthGuard]
      }, {
        path: 'new-question/:id', component: NewQuestionComponent, canActivate: [AuthGuard]
      }, {
        path: 'question-setup', component: QuestionSetupComponent, canActivate: [AuthGuard]
      }, {
        path: 'room-setup', component: RoomSetupComponent, canActivate: [AuthGuard]
      }, {
        path: 'room-setup/:id', component: RoomSetupDetailComponent, canActivate: [AuthGuard]
      }, {
        path: 'all-selling', component: AllSellingComponent, canActivate: [AuthGuard]
      }, {
        path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]
      }, {
        path: 'events', component: EventsComponent, canActivate: [AuthGuard]
      }, {
        path: 'new-event', component: NewEventComponent, canActivate: [AuthGuard]
      }, {
        path: 'question-set-setup', component: QuestionSetSetupComponent, canActivate: [AuthGuard]
      },
      {
        path: 'new-question-set', component: NewQuestionSetComponent, canActivate: [AuthGuard]
      },
      {
        path: 'new-question-set/:id', component: NewQuestionSetComponent, canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DasboadRoutingModule { }
