import { AlertService } from './alert.service';
import { IUser } from './../models/IUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { first, tap, catchError,delay} from 'rxjs/operators';

//import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uservalue: IUser;
  errorFlag = false;

  _SERVICEURL: string = 'http://localhost:8080/training';

  constructor(private _http: HttpClient) {
  }

  
  checkUserExist1(userdata: IUser): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'content-type': 'application/json'
        },
      )
    }
    return this._http.get<IUser>(this._SERVICEURL + "/users/getByName/" + userdata.username, httpOptions);
    
    //.pipe(tap(_ => console.log("Called Tap")));
  }

  register(userdata: IUser): Observable<any>  {
    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'content-type': 'application/json'
        },
      )
    };
      console.log('UserService register() POST');
      return this._http.post(this._SERVICEURL + "/register", userdata, httpOptions).pipe(delay(10000));
  }

  registerBkp(userdata: IUser) {
    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'content-type': 'application/json'
        },
      )
    };

    console.log("UserService.register : " + JSON.stringify(userdata));

    /*this._http.get<any>(this._SERVICEURL + "/users/getByName/" + userdata.username, httpOptions)
     .subscribe(
       data => {
         console.log('UserService register() get : '+JSON.stringify(data));
         this.uservalue = data;
       },
       error => {
         console.log("GET : Error :  " + error);
         return this.error('Unknown Error');
       }
     );*/
    this._http.get<any>(this._SERVICEURL + "/users/getByName/" + userdata.username, httpOptions)
      .subscribe(
        user => this.uservalue = user
      );

    console.log("Problem : " + this.uservalue);
    if (this.uservalue === null || this.uservalue === undefined) {
      //Generate Token
      //userdata.token = userdata.userloginid + "" + userdata.password;
      console.log('UserService register() POST');
      return this._http.post(this._SERVICEURL + "/register", userdata, httpOptions);
    }
    else {
      console.log('UserService Else ');
      return this.error('Username Already Exists');
    }
  }

  error(message) {
    return throwError({ error: { message } });
  }

}
