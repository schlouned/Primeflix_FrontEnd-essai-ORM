import {Inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../Model/user";
import {Observable, Subject} from "rxjs";


@Injectable({ providedIn: 'root' })
export class AccountService {
  //members
  //subject use to know what kind of user is logged
  userTypeSubject = new Subject<any>();

  //constructor
  constructor( private router: Router, private http: HttpClient) {
  }

  //login method
  login(user: User): Observable<any> {
    return this.http.post(environment.baseUrl+environment.loginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json'  }
      });
  }

  //logout method
  logout(): Observable<any>{
    return this.http.get<any>(environment.baseUrl+environment.logoutUrl);

    //sessionStorage.clear();
    //localStorage.clear();
  }

  //get user informations
  getUserInformations(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + environment.getUserInformations);
  }

  //update user informations
  updateUserInformations(user: User): Observable<any>{
    return this.http.post(environment.baseUrl+environment.updateUserInformations, JSON.stringify(user),
      {
        headers:{ 'Content-Type': 'application/json' }
      });
  }

  //get Store address
  getStoreAddress(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + environment.getCompanyAddress);
  }
  //***********************************************************************
  //util
  //***********************************************************************

  //storetoken
  storeToken(token: string, auth_type: string, auth_email: string, cartItemsNumber: string) {
    sessionStorage.setItem("auth_token", token);
    sessionStorage.setItem("auth_type", auth_type);
    sessionStorage.setItem("auth_email", auth_email);
    sessionStorage.setItem("cartItemsNumber", cartItemsNumber);
  }

  getToken() {
    return sessionStorage.getItem("auth_token");
  }

  removeToken() {
    sessionStorage.removeItem("auth_type");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_email");
    sessionStorage.removeItem("cartItemsNumber");
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  //get auth type
  getAuthRole(): string | null {
    if (sessionStorage.getItem("auth_type") !== null) {
      return sessionStorage.getItem("auth_type");
    }
    return null;
  }

  //store email address
  storeEmail(email: string){
    sessionStorage.setItem("email", email);
  }


  //emit user informations when login or logout
  emitUserTypeSubject() {
    this.userTypeSubject.next(sessionStorage);

  }

}
