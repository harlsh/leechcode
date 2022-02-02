import { Component, OnInit } from '@angular/core'; 
import { Example } from '../../models/example';

@Component({
  selector: 'app-problem-statement',
  templateUrl: './problem-statement.component.html',
  styleUrls: ['./problem-statement.component.css']
})
export class ProblemStatementComponent implements OnInit {
  examples:Example[];
  originalCode: string = "class Solution {\n\tpublic int[] twoSum(int[] nums, int target) {\n]t}\m}";
  constructor() { }

  ngOnInit(): void {
    this.examples = [{
      index: 0,
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    }, 
    {
      index:1,
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "null"
    }]
  }

}
