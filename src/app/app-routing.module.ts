import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePracticePaperComponent } from './create-practice-paper/create-practice-paper.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { PracticePapersComponent } from './practice-papers/practice-papers.component';
import { TestsComponent } from './tests/tests.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { ViewresultComponent } from './viewresult/viewresult.component';

const routes: Routes = [

  {
    path: 'home', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'tests', component: TestsComponent
      },
      {
        path: 'practice-papers', component: PracticePapersComponent
      }
    ],

  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'create-test', component: CreateTestComponent
  },
  {
    path: 'create-practice-paper', component: CreatePracticePaperComponent
  },
  {
    path: 'submissions', component: SubmissionsComponent
  },
  {
    path: 'viewresult', component: ViewresultComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
