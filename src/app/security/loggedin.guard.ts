import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) {}

  canLoad(route: Route): boolean {
    console.log('canLoad');
    return this.checkAuthentication(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate');
    return this.checkAuthentication(route.routeConfig.path);
  }

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      //this LoggedInGuard will be placed into every single route that we want the user to be authorized to step in.
      //It means that this 'route.path' will be dinamic.
      //For example, when is the '/order' path which is checking if the user is logged in, this 'path' will be 'order', and so on.
      this.loginService.handleLogin(`/${path}`);
    }

    return loggedIn;
  }

}
