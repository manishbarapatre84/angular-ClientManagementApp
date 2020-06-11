import { IUser } from './../../models/IUser';
import { AlertService } from './../../services/alert.service';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  uservalue: IUser;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    console.log('RegisterComponent..');
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      roles: ['', Validators.required],
      userloginid: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log('RegisterComponent onSubmit()');
    this.submitted = true;
    //let isUserExist = false;


    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    /*
    * Check User Exist or not.
    */
    //let userData = this.userService.checkUserExist(this.registerForm.value);

    // Step 1
    this.userService.checkUserExist1(this.registerForm.value)
      .subscribe((res: any) => {
        this.uservalue = res;
        console.log(this.uservalue);
        this.nextCall() ;

      }, err => {
        console.log("Error Reported");
        console.log(err);
      });


    this.loading = false;
  } // End of OnSubmit

  nextCall() {
    let isUserExist;
    console.log(this.uservalue);
    if (!this.uservalue) {
      isUserExist = false;
    } else {
      isUserExist = true;
    }
    console.log("User Exists ?? : " + isUserExist);

    // Step 2
    if (isUserExist) {
      this.alertService.error('User Already exist.');
      this.loading = false;
    } else {
      this.userService.register(this.registerForm.value)
        .subscribe(
          data => {
            console.log("No Error");
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            console.log("Error Reported : " + JSON.stringify(error));
            this.alertService.error(JSON.stringify(error));
            //this.alertService.error(error.error.message);
            this.loading = false;
          });
    } // End of Else
    console.log("End of Function");
  }
}
