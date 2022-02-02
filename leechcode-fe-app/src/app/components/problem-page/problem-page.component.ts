import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.css']
})
export class ProblemPageComponent implements OnInit {
  tabs = ['Description','Solution','Discuss'];
  selectedTab = 'Description';
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode: string = "class Solution {\n\tpublic int[] twoSum(int[] nums, int target) {\n\n\t}\n}";
  constructor() { }

  ngOnInit(): void {
  }
  openTab(tab:any){
    this.selectedTab = tab;
  }

}
