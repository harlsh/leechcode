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
    .subscribe(data => {
      
    this.data =  Object.values(data)[0]
    for(var i = 0; i < this.data.length; i++){
      this.problems.push(this.problemToJSON(JSON.stringify(this.data[i])));
    }
      
    console.warn("problem object array", this.problems);
    });
  }
  
  problemToJSON(json:string){
    var obj = JSON.parse(json);
    return new Problem(obj.title,obj.titleSlug,obj.content,obj.difficulty,obj.likes,obj.dislikes,obj.exampleTestCase,obj.hints);
  }
  viewProblem(titleSlug:string){
    this.router.navigate(["problem/" + titleSlug + "/description"]);
  }

}