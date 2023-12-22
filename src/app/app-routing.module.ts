import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExaminationComponent } from './components/examination/examination.component';
import { AuthGuard } from './auth.guard';
//for admin route
import { AuthGuardAdmin } from './auth-admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { QuestionComponent } from './components/question/question.component';
import { SettingComponent } from './components/setting/setting.component';
import { QuestComponent } from './components/quest/quest.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'examination', component: ExaminationComponent, canActivate: [AuthGuard] },
  { path: 'course-content', component: CourseContentComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardAdmin] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuardAdmin] },
  { path: 'questions', component: QuestionComponent, canActivate: [AuthGuardAdmin] },
  { path: 'question/create', component: QuestComponent, canActivate: [AuthGuardAdmin] },
  { path: 'question/edit/:id', component: QuestComponent, canActivate: [AuthGuardAdmin] },
  { path: 'settings', component: SettingComponent, canActivate: [AuthGuardAdmin] },
  { path:'', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
