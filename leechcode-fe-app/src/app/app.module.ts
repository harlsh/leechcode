import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTabNav } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';

import { ProblemPageComponent } from './components/problem-page/problem-page.component';
import { ProblemStatementComponent } from './components/problem-statement/problem-statement.component';



import { HomePageComponent } from './components/home-page/home-page.component';

import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemsApiService } from './models/problems-api.service';
import { AdminPanelComponent } from './components/adminpanel/adminpanel.component';
import { AdminProbListComponent } from './components/adminpanel/admin-prob-list/admin-prob-list.component';

import { CreateProblemComponent } from './components/adminpanel/create-problem/create-problem.component';
import { UpdateProblemComponent } from './components/adminpanel/update-problem/update-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { SolutionPageComponent } from './components/problem-page/solution-page/solution-page.component';
import { ProblemDiscussPageComponent } from './components/problem-page/problem-discuss-page/problem-discuss-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { LoginformComponent } from './components/login/loginform/loginform.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemPageComponent,
    ProblemStatementComponent,
    HomePageComponent,
    ProblemListComponent,
    ProblemListComponent,
    AdminPanelComponent,
    AdminProbListComponent,
    CreateProblemComponent,
    UpdateProblemComponent,
    NavbarComponent,
    SolutionPageComponent,
    ProblemDiscussPageComponent,
    LoginComponent,
    LoginformComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    MonacoEditorModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    NgbModule,
    MatToolbarModule,
    MatButtonModule, ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
    
  ],
  providers: [ProblemsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
