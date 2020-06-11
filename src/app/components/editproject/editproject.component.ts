import { AuthenticationService } from './../../services/authentication.service';
import { IProject } from './../../models/IProject';
import { AlertService } from './../../services/alert.service';
import { ProjectService } from './../../services/project.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {

  projectForm: FormGroup;
  isEditProjectFlag: boolean = true;
  returnUrl: string;

  @Input()
  projectFromParent: IProject;

  @Input()
  parentClienId: number;

  loading = false;
  submitted = false;
  formAction = "Add";
  projectvalue: IProject;
  isEditFlag: boolean = false;

  constructor(
    private projectformBuilder: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    /*if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }*/
  }

  // convenience getter for easy access to form fields
  get f() { return this.projectForm.controls; }

  ngOnInit() {
    this.projectForm = this.projectformBuilder.group({
      projectname: ['', Validators.required],
      status: ['', Validators.required],
      clientid: [ ],
      projectid: [ ]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    console.log(this.projectFromParent);
    console.log("ngOninit called : Client Id -> " + this.parentClienId);
    if (this.projectFromParent) {
      this.setProjectForEdit();
      this.formAction = "Edit";
      this.isEditProjectFlag = true;
      this.isEditFlag = true;
    } else {
      this.formAction = "Add";
      this.isEditProjectFlag = false;
      this.setProjectForAdd();
      this.isEditFlag = false;
    }
  }

  setProjectForEdit() {
    this.projectForm.patchValue({
      clientid: this.projectFromParent.clientid,
      projectid: this.projectFromParent.projectid,
      projectname: this.projectFromParent.projectname,
      status: this.projectFromParent.status
    });
  }
  setProjectForAdd() {
    this.projectForm.patchValue({
      clientid: this.parentClienId,
      projectname: '',
      status:''
    });
  }

  onSubmit() {
    console.log("onSubmit called");
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.projectForm.invalid) {
      return;
    }
    this.loading = true;

    console.log(this.projectForm.value);

    this.projectService.saveProject(this.projectForm.value)
      .subscribe((res: any) => {
        console.log("Save Client response");
        console.log(res);
        this.resetForm();
        this.alertService.success('Project Saved successful', true);
        //this.router.navigate(['/']);
        console.log("this.returnUrl : "+this.returnUrl)
        this.router.navigate([this.returnUrl]);
      }, err => {
        console.log("Error Reported");
        console.log(err);
        this.alertService.error(JSON.stringify(err));
      });
    this.loading = false;
  }

  onDelete() {
    console.log("onDelete called");
    // stop here if form is invalid
    if (this.projectForm.invalid) {
      return;
    }

    this.loading = true;
    this.projectService.deleteProject(this.projectForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.resetForm();
        this.alertService.success('Project Deleted successful', true);
        this.router.navigate(['/']);
        //this.router.navigate([this.returnUrl]);
      }, err => {
        console.log("Error Reported");
        console.log(err);
        this.alertService.error('Unknown Error');
      });

    this.loading = false;
    //this.router.navigate(['/']);
  }

  onCancel() {
    console.log("onCancel called");
  }

  resetForm() {
    console.log("Project resetForm Called");
    this.formAction = "Add";
    this.isEditProjectFlag = false;
    this.router.navigate(['/']);
    this.projectForm.reset();
  }
}
