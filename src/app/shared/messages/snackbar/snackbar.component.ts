import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';

import { Observable, timer } from 'rxjs';

import {tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there.'

  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
    .pipe(
      tap(message => {
        this.message = message;
        this.snackVisibility = 'visible';
      }),
      //within switchMap what is happening is :
      //it reseives the message from the other observable
      //afterwards it changes the 'current' Observable to the timer one
      //right after I subscribe to this observable.
      //somthing interesting that happen is : switchMap checks if there is any other subscribe to this observable and make an unsubscribe to this 'old' one.
      //and then subscribe it again.
      //By doing it, there will be no concurrent timers.
      switchMap(message => timer(3000))
    ).subscribe(timer => this.snackVisibility = 'hidden');
  }

  toggleSnack() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible': 'hidden';
  }

}
