import { AuthenticationService } from './../../services/authentication.service';
import { AlertService } from './../../services/alert.service';
import { ClientService } from './../../services/client.service';
import { IClient } from './../../models/IClient';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {

  clientForm: FormGroup;
  clientvalue: IClient;

  loading = false;
  submitted = false;
  formAction ="Add";
  isEditFlag : boolean = false;


  constructor(
    private clientformBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private alertService: AlertService
  ) {
    console.log('ClientlistComponent..');
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  //@Input() clientData : IClient

  ngOnInit() {
    this.clientForm = this.clientformBuilder.group({
      clientname: ['', Validators.required],
      location: ['', Validators.required],
      clientid : [ ]
    });
    this.setFormForEdit();    
  }

  setFormForEdit(){
    console.log("ngOnInit : " ,this.clientService.clientForEdit)

    if(this.clientService.clientForEdit){
      //this.clientForm.value.clientname=this.clientService.clientForEdit.clientname;
      //this.clientForm.value.location=this.clientService.clientForEdit.location;
      this.clientForm.patchValue({
        clientname : this.clientService.clientForEdit.clientname,
        location : this.clientService.clientForEdit.location,
        clientid : this.clientService.clientForEdit.clientid
      });
      this.formAction ="Edit";
      this.isEditFlag=true;
    }else{
      this.formAction ="Add";
      this.isEditFlag=false;
    }
  }

  resetForm(){
    console.log("resetForm Called");
    this.formAction ="Add";
    this.isEditFlag=false;
    this.clientForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.clientForm.controls; }

  onSubmit() {
    console.log('RegisterComponent onSubmit()');
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.clientForm.invalid) {
      return;
    }
    console.log("Step 1");

    this.loading = true;

    console.log(this.clientForm.value);
    
    this.clientService.saveClient(this.clientForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.clientvalue = res;
        this.alertService.success('Client Added successful', true);
        console.log(this.clientvalue);
        this.resetForm();
        this.router.navigate(['/']);
      }, err => {
        console.log("Error Reported");
        console.log(err);
        this.alertService.error(JSON.stringify(err));
      });
      this.loading = false;
  }

  onCancel(){
    this.resetForm();
    this.router.navigate(['/']);
  }

  onDelete(){
    this.clientService.deleteClient(this.clientForm.value)
    .subscribe((res: any) => {
      console.log(res);
      //this.clientvalue = res;
      this.alertService.success('Client Deleted successful', true);
      //console.log(this.clientvalue);
      this.resetForm();
      this.router.navigate(['/']);
    }, err => {
      console.log("Error Reported");
      console.log(err);
      this.alertService.error('Unknown Error');
    });
    this.loading = false;
    //this.router.navigate(['/']);
  }

}
