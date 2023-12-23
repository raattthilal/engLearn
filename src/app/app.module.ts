import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExaminationComponent } from './components/examination/examination.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Apiinterceptor } from './apiinterceptor';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { QuestionComponent } from './components/question/question.component';
import { SettingComponent } from './components/setting/setting.component';
import { QuestComponent } from './components/quest/quest.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CourseContentComponent,
    PaymentComponent,
    ProfileComponent,
    ExaminationComponent,
    DashboardComponent,
    UserComponent,
    QuestionComponent,
    SettingComponent,
    QuestComponent,
    SuccessAlertComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Apiinterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
