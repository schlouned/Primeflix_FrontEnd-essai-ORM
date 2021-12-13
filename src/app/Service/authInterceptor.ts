import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AccountService} from "./account.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  //constructor
  constructor(private accountService: AccountService){}

  //method call each time that a http request is made
  //in order to add the token to the request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //if the token is already in the session storage => create request with autentication
    if(this.accountService.getToken() != null){
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.accountService.getToken()}`)
      });
      //return the request with token
      return next.handle(authRequest);
    }
    //if there is no token in the session storage send the normal request
    else{
      return next.handle(request);
    }
  }
}
