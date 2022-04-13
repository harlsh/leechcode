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
  problem = new Problem("","","","",12,12,"",""); 
  data: Object[] = []
  title: string;
  difficulty:string;
  description: string;
  titleSlug: string = "";
  originalCode: string = "class Solution {\n\tpublic int[] "+ this.titleSlug  +"(int[] nums, int target) {\n]t}\m}";
  constructor(private pa: ProblemsApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['titleSlug'];
    this.pa.getProblemBySlug(this.titleSlug).subscribe(data => {
      this.data =  Object.values(data)[1]
      this.problem = this.problemToJSON(JSON.stringify(this.data));
      this.title = this.problem.title;
      this.description = this.problem.content;
      this.difficulty = this.problem.difficulty;
      console.log(this.problem);
    })

  }

  problemToJSON(json:string){
    var obj = JSON.parse(json);
    return new Problem(obj.title,obj.titleSlug,obj.content,obj.difficulty,obj.likes,obj.dislikes,obj.exampleTestCase,obj.hints);
  }

}
