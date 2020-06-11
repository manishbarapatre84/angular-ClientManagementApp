import { IUser } from './../../models/IUser';
import { FormGroup } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { IProject } from './../../models/IProject';
import { IClient } from './../../models/IClient';
import { ProjectService } from './../../services/project.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {

  projectlist: IProject[];
  isProjectFlag : boolean = false;
  loading = false;
  editProjectObject : IProject;
  clientId : number;
  user : IUser;
  isEditEnabled:boolean=false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { 
    console.log("ProjectlistComponent")
    this.user = this.authenticationService.currentUserValue;
    console.log(this.user);
    if (!this.user) {
      this.router.navigate(['/']);
      return ;
    }
    console.log(this.user);
    if(this.user.roles=='rmz'){
      this.isEditEnabled=false;
    }else{
      this.isEditEnabled=true;
    }
    
  }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.clientId = Number(params.get('id'));
      this.getProjectListByClient(this.clientId);
    });
    this.loading = false;
  }

  getProjectListByClient(clientid) {
    this.projectService.getProjectList(clientid)
      .subscribe((res: any) => {
        this.projectlist = res;
        console.log(this.projectlist);
      }, err => {
        console.log("getProjectListByClient ## Error Reported");
        this.alertService.error('No Project Found.');
        this.loading = false;
        console.log(err);
      });
  }

  editProject(project : IProject){
    this.isProjectFlag=true;
    //this.projectFormAction="edit";
    this.editProjectObject=project;
    console.log("editProject Called");
  }

  addProject(){
    this.isProjectFlag=true;
    //this.clientId="add";
    this.editProjectObject=null;
    console.log("addProject Called");
  }

  onProjectCancel(){
    this.isProjectFlag=false;
  }

}
