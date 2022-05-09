import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { StartTimeComponent } from './start-time/start-time.component';
import { TimerComponent } from './timer/timer.component';
import { FinishComponent } from './finish/finish.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login/callback', component: OktaCallbackComponent},
  { path: 'starttime', component: StartTimeComponent},
  { path: 'timer', component: TimerComponent},
  { path: 'finish', component: FinishComponent},
  { path: 'evaluation', component: EvaluationComponent},
  { path: 'penalty', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
