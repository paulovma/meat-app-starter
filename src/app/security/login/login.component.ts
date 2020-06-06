import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });

    //when the user is in the order page and tries to perform something unauthorized
    //he is gonna be redirected to the login page.
    //RIght after his login, this ['to'] will be 'order', so we know that we gotta redirect him to this page.
    //When there is no parameter, it means that he's just arrived to the application and is trying to log in.
    //Right after his log in we will redirect him to the beginning.
    this.navigateTo = this.activatedRoute.snapshot.queryParams['to'] || '/';
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user => this.notificationService.notify(`Bem vindo ${user.name}`),
        response => this.notificationService.notify(response.error.message),
        () => { this.router.navigate([this.navigateTo]) }
      );
  }

}
