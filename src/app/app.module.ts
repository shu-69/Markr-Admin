import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestsComponent } from './tests/tests.component';
import { CreateTestComponent } from './create-test/create-test.component';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'
import { MatChipsModule } from '@angular/material/chips'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CreatePracticePaperComponent } from './create-practice-paper/create-practice-paper.component';
import { PracticePapersComponent } from './practice-papers/practice-papers.component';
import { QuestionImagePickerComponent } from './components/question-image-picker/question-image-picker.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { ViewresultComponent } from './viewresult/viewresult.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    SideNavComponent,
    TestsComponent,
    CreateTestComponent,
    CreatePracticePaperComponent,
    PracticePapersComponent,
    QuestionImagePickerComponent,
    SubmissionsComponent,
    ViewresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FontAwesomeModule, BrowserAnimationsModule, MatSelectModule, FormsModule, HttpClientModule, MatDialogModule,
    MatMenuModule, MatIconModule, MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
