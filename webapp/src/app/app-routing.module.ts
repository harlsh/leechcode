import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContestsComponent } from './contests/contests.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProblemListComponent } from './problem-list/problem-list.component';

const routes: Routes = [
  { path: '', component: MainNavComponent },
  {
    path: 'problems',
    component: ProblemListComponent,
    children: [
      { path: 'create', component: CreateProblemComponent }
    ]
  },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'contests', component: ContestsComponent },
  { path: 'about', component: AboutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
