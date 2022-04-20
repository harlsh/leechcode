import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/models/problem';
import { ProblemsApiService } from 'src/app/models/problems-api.service';


@Component({
  selector: 'app-problem-statement',
  templateUrl: './problem-statement.component.html',
  styleUrls: ['./problem-statement.component.css']
})
export class ProblemStatementComponent implements OnInit {
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
    hints: "xxx",
  };
  titleSlug: string = "";
  originalCode: string = "class Solution {\n\tpublic int[] "+ this.titleSlug  +"(int[] nums, int target) {\n]t}\m}";
  constructor(private pa: ProblemsApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.pa.getProblemBySlug(this.titleSlug).subscribe(data => {this.problem = data})

  }

}
