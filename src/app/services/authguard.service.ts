import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

/*The preferred way to create a singleton service is to set 
  providedIn to root on the service's @Injectable() decorator.
  This tells Angular to provide the service in the application root.
**/
/*CanActivate Interface that a class can implement to be a guard deciding if 
  a route can be activated. If all guards return true, navigation 
  will continue. If any guard returns false, navigation will be 
  cancelled.
  For more details: https://angular.io/api/router/CanActivate
**/

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    console.log('AuthGuard : canActivate()');
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      console.log('AuthGuard : canActivate() :'+true);
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
