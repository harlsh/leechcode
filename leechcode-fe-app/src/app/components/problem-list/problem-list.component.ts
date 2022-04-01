import { problemList } from './problem-list.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  constructor(public service: problemList){ }

  problems: any;

  ngOnInit(): void {

    this.service.getProjects().subscribe(data => {
      this.problems.data = data;
    });
  }

}
