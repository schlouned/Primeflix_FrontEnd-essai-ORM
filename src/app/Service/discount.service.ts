import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Discount} from "../Model/discount";

@Injectable({ providedIn: 'root' })
export class DiscountService {
  //members

  //constructor
  constructor(private http: HttpClient) {
  }

  //methods
  //getCategories
  getCategories(): Observable<any>{
    return this.http.get(environment.baseUrl+environment.getCategories);
  }

  //save discount
  saveDiscount(discount: Discount): Observable<any>{
    return this.http.post(environment.baseUrl+environment.saveDiscount, JSON.stringify(discount),
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  getDiscounts(): Observable<any>{
    return this.http.get(environment.baseUrl+environment.getDiscounts);
  }

  deleteDiscount(discount:Discount): Observable<any>{
    return this.http.post(environment.baseUrl+environment.deleteDiscount, JSON.stringify(discount),
      {
        headers:{ 'Content-Type': 'application/json' }
      });
  }

}
