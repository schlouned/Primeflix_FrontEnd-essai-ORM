import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../Model/user";

@Injectable({providedIn: 'root'})
export class UserService {
  //members

  //constructor
  constructor(private http: HttpClient) {
  }

  //methods
  getUsers(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + environment.getUsers);
  }

  saveUser(user: User): Observable<any>{
    return this.http.post(environment.baseUrl+environment.saveUser, JSON.stringify(user),
      {
        headers:{ 'Content-Type': 'application/json' }
      });
  }

  deleteUser(user:User): Observable<any>{
    return this.http.post(environment.baseUrl+environment.deleteUser, JSON.stringify(user),
      {
        headers:{ 'Content-Type': 'application/json' }
      });
  }
}
