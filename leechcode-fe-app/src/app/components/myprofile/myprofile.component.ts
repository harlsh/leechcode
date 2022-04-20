import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProblemsApiService } from 'src/app/models/problems-api.service';
import { Submission } from 'src/app/models/submission';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  isAdmin: boolean;
  data: Object[] = []
  submissions: Submission[] = []
  constructor(private pa: ProblemsApiService, private router: Router) { }

  ngOnInit(): void {
    const rawAdminStatus =localStorage.getItem('isAdmin');
    if (rawAdminStatus){
      this.isAdmin = JSON.parse(rawAdminStatus);
    }else {
      this.isAdmin = false;
    }
    this.getSubmissions();
  }
  getSubmissions(){
    let user = localStorage.getItem('user');
    let uid = "error";
    if(user){
      let userJSON = JSON.parse(user);
      uid = userJSON.uid;
    }
    this.pa.getSubmissions(uid)
    .subscribe(data => {
      this.submissions = data;
      console.log(this.submissions)
    });
  }
  viewProblem(titleSlug:string, code: string, language: string){
    console.log(code);
    const navigationExtras = {code: code, language: language};
    this.router.navigate(["problem/" + titleSlug + "/description",navigationExtras]);
  }

}
