import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ContestsComponent } from './contests/contests.component';
import { AboutComponent } from './about/about.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@Angular/material/card';
import { MatProgressSpinnerModule } from '@Angular/material/progress-spinner';
import { SolveProblemComponent } from './solve-problem/solve-problem.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ProblemListComponent,
    DiscussionComponent,
    ContestsComponent,
    AboutComponent,
    CreateProblemComponent,
    DataTableComponent,
    SolveProblemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
