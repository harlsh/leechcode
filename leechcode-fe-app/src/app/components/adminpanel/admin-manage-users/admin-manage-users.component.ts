import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { simpleUser } from 'src/app/models/simpleuser';

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
export class AdminManageUsersComponent implements OnInit {

  constructor(public authService: AuthService,public cd: ChangeDetectorRef) { }
  users: simpleUser[] = []
  data: Object[] = []
  ngOnInit(): void {
    this.getProblems()
  }

  getProblems(){
    this.authService.retrieveUsers()
    .subscribe((data: any) => {
    this.users = [];
    this.data = data;
    for(var i = 0; i < this.data.length; i++){
      this.users.push(this.userToJSON(JSON.stringify(this.data[i])));
    }
    console.log(this.users)

    });
  }
  
   userToJSON(json:string){
    var obj = JSON.parse(json);
    return new simpleUser(obj.id,obj.data.email,obj.data.isAdmin);
  }

  toggleAdmin(uid: string, current: boolean){
    this.authService.toggleAdmin(uid,!current);
    this.getProblems();
  }
}
