import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemsApiService } from 'src/app/models/problems-api.service';
import { Problem } from 'src/app/models/problem';
import { Router } from '@angular/router';

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
  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.descriptionUrl = ["/problem/"+ this.titleSlug +"/description"];
    this.solutionUrl = ["/problem/" + this.titleSlug+ "/solution"];
    this.discussUrl = ["/problem/"+ this.titleSlug +"/discuss"];
  }

}
