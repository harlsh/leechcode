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
  problem = new Problem("","","","",12,12,"",""); 
  constructor(private pa: ProblemsApiService, private route: ActivatedRoute) { }
  data: Object[] = []
  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.pa.getProblemBySlug(this.titleSlug).subscribe(data => {
      this.data =  Object.values(data)[0]
      this.problem = this.problemToJSON(JSON.stringify(this.data));
      console.log(this.problem);
    })
    
  }

  problemToJSON(json:string){
    var obj = JSON.parse(json);
    return new Problem(obj.title,obj.titleSlug,obj.content,obj.difficulty,obj.likes,obj.dislikes,obj.exampleTestCase,obj.hints);
  }

  updateProblem(){
    
  }
}
