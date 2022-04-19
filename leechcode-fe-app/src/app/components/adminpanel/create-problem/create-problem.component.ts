import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Problem } from 'src/app/models/problem';
import { ProblemsApiService } from 'src/app/models/problems-api.service';
@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit {
  
  problem : Problem = {
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
  constructor(private pa: ProblemsApiService, private router:Router) { }
  ngOnInit(): void {

  }

  createNewProblem(){
    
    this.pa.createProblem(this.problem).subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin/problemslist']);
    });
    console.log(this.problem);
  }  
}
