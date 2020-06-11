import { IProject } from './../models/IProject';
import { Observable } from 'rxjs';
import { IClient } from './../models/IClient';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //clientForEdit : IClient ;

  _SERVICEURL: string = 'http://localhost:8080/training';

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      }
    )
  }

  constructor(private _http: HttpClient) {}

  getProjectList(clientid): Observable<any> {
    console.log("getProjectList Called");
    return this._http.get<IProject[]>(this._SERVICEURL + "/api/projects/getByClientId/"+clientid, this.httpOptions);
    //.pipe(tap(_ => console.log("Called Tap")));
  }

  saveProject(projectdata : IProject): Observable<any> {
    console.log("saveProject Called");
    console.log(projectdata);
    return this._http.post<IClient>(this._SERVICEURL + "/api/projects/save",projectdata, this.httpOptions);
  }

  deleteProject(projectdata : IProject): Observable<any> {
    console.log("deleteProject Called");
    console.log(projectdata);
    console.log("deleteProject Called Step 2");
    return this._http.post<IClient>(this._SERVICEURL + "/api/projects/delete",projectdata, this.httpOptions);
  }

}



