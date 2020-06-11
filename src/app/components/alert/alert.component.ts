import { AlertService } from './../../services/alert.service';
/* COMMON ALERT COMPONENTS and CAN BE USE across the application */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'; // It is like a Observable

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  /*A Subscription is an object that represents a disposable resource,usually the execution of an Observable.
A Subscription has one important method, unsubscribe , that takes no argument and just disposes the resource
held by the subscription.
*/
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService ) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }
        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
