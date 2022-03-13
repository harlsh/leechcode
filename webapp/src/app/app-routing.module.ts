import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContestsComponent } from './contests/contests.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { EditorComponent } from './editor/editor.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { SolveProblemComponent } from './solve-problem/solve-problem.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainNavComponent,
    children: [
      { path: 'problems', component: ProblemListComponent, outlet: "sidebar" },
      { path: 'discussion', component: DiscussionComponent, outlet: "sidebar" },
      { path: 'contests', component: ContestsComponent, outlet: "sidebar" },
      { path: 'about', component: AboutComponent, outlet: "sidebar" }
    ]
  },

  { path: 'problems/:id', component: SolveProblemComponent },
  { path: 'editor', component: EditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
