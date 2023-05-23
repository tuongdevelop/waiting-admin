import { NewEventModule } from './new-event/new-event.module';
import { EventsModule } from './events/events.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VerticalMenuModule } from './vertical-menu/vertical-menu.module';
import { QuestionSetupModule } from './question-setup/question-setup.module';
import { AppRoutingModule } from './app-routing.module';
import { NewQuestionModule } from './new-question/new-question.module';
import { NewQuestionSetModule } from './new-question-set/new-question-set.module';
import { AllSellingModule } from './all-selling/all-selling.module';
import { RoomSetupModule } from './room-setup/room-setup.module';
import { QuestionSetSetupModule } from './question-set-setup/question-set-setup.module';
import { UserManagementModule } from './user-management/user-management.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoomSetupDetailModule } from './room-setup/room-setup-detail/room-setup-detail.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ExpandMenuDirective } from './shared/directive/expand-menu.directive';
import { LoginModule } from './login/login.module';
import { DashboadModule } from './dashboad/dashboad.module';
import { AlertService, AuthenticationService } from './core/services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JWT_OPTIONS, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { RefreshTokenInterceptor } from './core/helpers/refresh-token-interceptor';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgxSpinnerModule } from 'ngx-spinner';

export function jwtOptionsFactory (authorizationService: AuthenticationService) {
  return {
    tokenGetter: () => {
      return authorizationService.getAccessToken() ? authorizationService.getAccessToken() : {access_token: null};
    },
    blacklistedRoutes: [`${environment.API_BASE_URL}api/admin/oauth/token`]
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ExpandMenuDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    VerticalMenuModule,
    QuestionSetupModule,
    LoginModule,
    AppRoutingModule,
    NewQuestionModule,
    NewQuestionSetModule,
    AllSellingModule,
    RoomSetupModule,
    QuestionSetSetupModule,
    UserManagementModule,
    EventsModule,
    NewEventModule,
    NgbModule,
    RoomSetupDetailModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    DashboadModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthenticationService]
      }
    }),
    NgxSpinnerModule,
    NgProgressModule,
    NgProgressHttpModule
  ],
  providers: [
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
