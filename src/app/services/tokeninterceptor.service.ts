import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('TokenInterceptor');
    // add authorization header with token if available

    let currentUser = this.authenticationService.currentUserValue;
    //console.log('TokenInterceptor currentUser : '+JSON.stringify(currentUser));
    if (currentUser && currentUser.token) {
      //console.log('TokenInterceptor currentUser.token : '+JSON.stringify(currentUser.token));
       const authReq = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${currentUser.token}`
        })
      });
      //console.log(authReq.headers.get("Authorization"));
      return next.handle(authReq);
    }
    // Forward The Request
    return next.handle(request);
  }

}
