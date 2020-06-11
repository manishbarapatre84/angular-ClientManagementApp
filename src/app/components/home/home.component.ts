import { ProjectService } from './../../services/project.service';
import { IClient } from './../../models/IClient';
import { ClientService } from './../../services/client.service';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { IUser } from './../../models/IUser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientList : IClient[];
  currentUser: IUser;
  users = []

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private clientservice: ClientService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.clientservice.holdClientForEdit(null);
    this.getAllClientList();
  }


  getAllClientList(){
    this.clientservice.getClientList()
      .subscribe((res: any) => {
        this.clientList = res;
        console.log(this.clientList);
      }, err => {
        console.log("getAllClientList ## Error Reported");
        console.log(err);
      });
  }

  editClient(clientData : IClient){
    console.log("editClient");
    this.clientservice.holdClientForEdit(clientData);
    this.router.navigate(['/clientlist']);
  }
  
  logout(){
    console.log("Logout Called");
    this.authenticationService.logout();
  }

}
