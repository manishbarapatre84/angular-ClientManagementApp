import { ErrorinterceptorService } from './services/errorinterceptor.service';
import { TokeninterceptorService } from './services/tokeninterceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './components/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ClientlistComponent } from './components/clientlist/clientlist.component';
import { ProjectlistComponent } from './components/projectlist/projectlist.component';
import { EditprojectComponent } from './components/editproject/editproject.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    AlertComponent,
    ClientlistComponent,
    ProjectlistComponent,
    EditprojectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : TokeninterceptorService, multi:true}
    ,{provide : HTTP_INTERCEPTORS, useClass : ErrorinterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
