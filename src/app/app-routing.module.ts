import { ProjectlistComponent } from './components/projectlist/projectlist.component';
import { ClientlistComponent } from './components/clientlist/clientlist.component';
import { AuthguardService } from './services/authguard.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  /*The canActivate method returns a boolean indicating whether or not
      navigation to a route should be allowed. If the user isn't authenticated,
      they are re-routed to some other place, in this case called AuthGuard. 
      Now the guard can be applied to any routes you wish to protect.
    **/
  { path: '', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientlist', component: ClientlistComponent },
  { path: 'projectlist/:id', component: ProjectlistComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
