import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from 'src/app/models/problem';
import { ProblemsApiService } from 'src/app/models/problems-api.service';

@Component({
  selector: 'app-update-problem',
  templateUrl: './update-problem.component.html',
  styleUrls: ['./update-problem.component.css']
})
export class UpdateProblemComponent implements OnInit {
  titleSlug: string;
  problem: Problem = {
    ID: 0,
    CreatedAt: "xxx",
    UpdatedAt: "xxx",
    DeletedAt: "xxx",
    title: "dummy",
    titleSlug: "dummy",
    content: "dummy",
    difficulty: "dummy",
    likes: 0,
    dislikes: 0,
    exampleTestCases: "xxx",
    hints: "xxx"
  };
  constructor(private pa: ProblemsApiService, private route: ActivatedRoute) { }
  data: Object[] = []
  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.pa.getProblemBySlug(this.titleSlug).subscribe(data => this.problem)
    
  }
  updateProblem(){
    
  }
}
