import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemsApiService } from 'src/app/models/problems-api.service';
import { Problem } from 'src/app/models/problem';
import { Router } from '@angular/router';
import { Problemsolution } from 'src/app/models/problemsolution';

@Component({
  selector: 'app-solution-page',
  templateUrl: './solution-page.component.html',
  styleUrls: ['./solution-page.component.css']
})
export class SolutionPageComponent implements OnInit {
  descriptionUrl: String[];
  solutionUrl: String[];
  discussUrl:String[];
  titleSlug = "";
  problemsolution: Problemsolution = {
    ID: 0,
    solution: "xxx"    
  };
  originalCode: string = "class Solution {\n\tpublic int[] "+ this.titleSlug  +"(int[] nums, int target) {\n]t}\m}";
  constructor(private pa: ProblemsApiService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.descriptionUrl = ["/problem/"+ this.titleSlug +"/description"];
    this.solutionUrl = ["/problem/" + this.titleSlug+ "/solution"];
    this.discussUrl = ["/problem/"+ this.titleSlug +"/discuss"];
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.pa.getProblemsolutionBySlug(this.titleSlug).subscribe(data => {this.problemsolution = data})

  }

}
