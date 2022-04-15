import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  isAdmin: boolean;
  constructor() { }

  ngOnInit(): void {
    const rawAdminStatus =localStorage.getItem('isAdmin');
    if (rawAdminStatus){
      this.isAdmin = JSON.parse(rawAdminStatus);
    }else {
      this.isAdmin = false;
    }
    
    
  }

}
