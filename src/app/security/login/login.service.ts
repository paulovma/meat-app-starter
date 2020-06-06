import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LOGIN_API } from '../../app.login.api';
import { User } from './user.model';
import { Observable } from 'rxjs';

import {tap, filter} from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class LoginService {

    user: User;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this.lastUrl = event.url);
    }

    isLoggedIn(): boolean {
      return this.user !== undefined;
    }

    login(email: string, password: string): Observable<any> {
      return this.http
        .post<User>(`${LOGIN_API}`, {email: email, password: password})
        .pipe(tap(user => this.user = user));
    }

    handleLogin(path: string = this.lastUrl): void {
      this.router.navigate(['/login'], { queryParams: {to: path} });
    }

    logout(): void {
      this.user = undefined;
    }

}
