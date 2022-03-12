import { Component, OnInit } from '@angular/core';
import { Problem } from '../interface/problem';
import { ProblemService } from '../service/problem.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[] = [];

  constructor(private problemService: ProblemService) { }

  ngOnInit(): void {
    this.problemService.getProblems()
      .subscribe(problems => this.problems = problems);
  }

}
