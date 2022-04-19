import { Component, OnInit } from '@angular/core';
import { ProblemsApiService } from 'src/app/models/problems-api.service';
import { Problem } from 'src/app/models/problem';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-prob-list',
  templateUrl: './admin-prob-list.component.html',
  styleUrls: ['./admin-prob-list.component.css']
})
export class AdminProbListComponent implements OnInit {

  data: Object[] = []
  problems: Problem[] = []

  constructor(private pa: ProblemsApiService, private router: Router) { }

  ngOnInit(): void {
    this.getProblems();

    
  
  }

  getProblems(){
    this.pa.getProblems()
    .subscribe(data => this.problems = data)
  }
  
  updateProblem(titleSlug:string){
    this.router.navigate(['admin/updateproblem/',titleSlug]);
  }

  viewProblem(titleSlug:string){
    this.router.navigate(["problem/" + titleSlug + "/description"]);
  }
  deleteProblem(titleSlug:string){
    this.pa.deleteProblemBySlug(titleSlug).subscribe(data => {
      console.log(data);
      this.getProblems();

    });
  }

}
