import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solve-problem',
  templateUrl: './solve-problem.component.html',
  styleUrls: ['./solve-problem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SolveProblemComponent implements OnInit {

  titleSlug: string | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleSlug = this.route.snapshot.params['id'];
    console.log(this.titleSlug)
  }

}
