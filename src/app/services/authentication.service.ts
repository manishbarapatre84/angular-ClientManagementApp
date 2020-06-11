import { IUser } from './../models/IUser';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _SERVICEURL: string = 'http://localhost:8080/training';

  //The BehaviorSubject holds the value that needs to be
  // shared with other components.
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient) {
    console.log('AuthenticationService...');

    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));

    this.currentUser = this.currentUserSubject.asObservable();
  }
  // Getter method for CurrentUser
  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }
  // pending: Update URL
  //on-login : store user details and usertoken in local storage to keep user logged in between page refreshes
  
  login(userloginid, userpassword) {
    console.log('AuthenticationService login() ');
    /*
    let params = new HttpParams();
    params = params.append('username', userloginid);
    params = params.append('password', userpassword);
    */
    let inputBody = {
      "username": userloginid,
      "password": userpassword
    }

    //return this.http.get<any>(this._SERVICEURL+"/user/getbylogincredentials", { params: params })

    const headers = { 'content-type': 'application/json' }
    console.log("inputBody :" + JSON.stringify(inputBody));

    //return this.http.post<any>(this._SERVICEURL + "/authenticate", inputBody, { 'headers': headers });

    
    return this.http.post<any>(this._SERVICEURL+"/authenticate",inputBody,{'headers':headers})
    .pipe(map(user => {
      
      if (!user){
        return this.error('Username or password is incorrect');
      }
      console.log("USER  : "+JSON.stringify(user));
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }
    ));
    
  }

  // On-Logout : remove user from local storage and set current user to null
  logout() {
    console.log('AuthenticationService logout() ');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  error(message) {
    return throwError({ error: { message } });
  }
}
