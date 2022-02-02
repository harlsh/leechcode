import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.css']
})
export class ProblemPageComponent implements OnInit {
  tabs = ['Description','Solution','Discuss'];
  selectedTab = 'Description';
  problem: "class Solution {\n\tpublic int[] twoSum(int[] nums, int target) {\n]t}\m}";
  constructor() { }

  ngOnInit(): void {
  }
  openTab(tab:any){
    this.selectedTab = tab;
  }

}
