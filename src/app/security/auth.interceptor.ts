import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let loginService = this.injector.get(LoginService);
      if (loginService.isLoggedIn()) {
        console.log(loginService.user.access_token);
        let authReq = req.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.access_token}`}});
        return next.handle(authReq);
      }

      return next.handle(req);
  }

}
