import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solve-problem',
  templateUrl: './solve-problem.component.html',
  styleUrls: ['./solve-problem.component.sass']
})
export class SolveProblemComponent implements OnInit {

  titleSlug: string | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['id'];
    console.log(this.titleSlug)
  }

}
