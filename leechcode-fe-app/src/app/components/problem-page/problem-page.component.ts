import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.css']
})
export class ProblemPageComponent implements OnInit {
  tabs = ['Description','Solution','Discuss'];
  selectedTab = 'Description';
  constructor() { }

  ngOnInit(): void {
  }
  openTab(tab:any){
    this.selectedTab = tab;
  }

}
