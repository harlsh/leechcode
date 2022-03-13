import { Component, Input, OnInit } from '@angular/core';
import { Problem } from '../interface/problem';
import { ProblemService } from '../service/problem.service';

@Component({
  selector: 'app-problem-content',
  templateUrl: './problem-content.component.html',
  styleUrls: ['./problem-content.component.scss']
})
export class ProblemContentComponent implements OnInit {

  @Input() titleSlug!: string;
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
  constructor(private problemService: ProblemService) { }

  ngOnInit(): void {
    this.problemService.getProblem(this.titleSlug)
      .subscribe(problem => {
        this.problem = problem;
        console.log(this.problem);
      });


  }

}
