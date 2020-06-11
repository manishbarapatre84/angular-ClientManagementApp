import { IClient } from './../models/IClient';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientForEdit : IClient ;

  _SERVICEURL: string = 'http://localhost:8080/training';

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*'
        //'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYiIsImV4cCI6MTU5MTAzNDA5NCwiaWF0IjoxNTkxMDE2MDk0fQ.jZa5lywJcBpn6D8y0i9gPSKNKGiu1UsRWp9MbB5FWJxqPs4puYh8FpELzl6vRTeChi3qeoz4HFnfVhhGWMHhKA'
      }
    )
  }

  constructor(private _http: HttpClient) {}

  getClientList(): Observable<any> {
    console.log("getClientList Called");
    //return this._http.get<IClient[]>(this._SERVICEURL + "/api/clients/get",this.httpOptions);
    return this._http.get<IClient[]>(this._SERVICEURL + "/api/clients/get");
    //.pipe(tap(_ => console.log("Called Tap")));
  }

  saveClient(clientdata: IClient): Observable<any> {
    console.log("saveClient Called");
    console.log(clientdata);
    console.log("saveClient Called Step 2");
    return this._http.post<IClient>(this._SERVICEURL + "/api/clients/save",clientdata, this.httpOptions);
  }

  deleteClient(clientdata: IClient): Observable<any> {
    console.log("deleteClient Called");
    console.log(clientdata);
    console.log("deleteClient Called Step 2");
    return this._http.post<IClient>(this._SERVICEURL + "/api/clients/delete",clientdata, this.httpOptions);
  }

  holdClientForEdit(clientdata: IClient){
    this.clientForEdit = clientdata;
  }

  resetActionClient(){
    this.clientForEdit =null;

  }

}

