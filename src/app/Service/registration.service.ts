import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {User} from "../Model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  //constructor
  constructor(private http: HttpClient) {}

  //Registration sign up
  register(user: User): Observable<any>{
    return this.http.post(environment.baseUrl+environment.registrationByEmailUrl, JSON.stringify(user),
      {
    headers:{ 'Content-Type': 'application/json' }
      });
  }
}
