import { ProblemListService } from 'src/app/services/problem-list.service';
import { Component, OnInit } from '@angular/core';
import { ProblemsApiService } from 'src/app/models/problems-api.service';
import { Router } from '@angular/router';
import { Problem } from 'src/app/models/problem';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  constructor(private pa: ProblemsApiService, private router: Router){ }

  data: Object[] = []
  problems: Problem[] = []

  ngOnInit(): void {
    this.getProblems();
  }

  getProblems(){
    this.pa.getProblems()
    .subscribe(data => this.problems = data);
  }
  
  viewProblem(titleSlug:string){
    this.router.navigate(["problem/" + titleSlug + "/description"]);
  }

}