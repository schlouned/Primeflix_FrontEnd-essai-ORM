import {Injectable} from "@angular/core";
import {AccountService} from "./account.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router, RouterLink, RouterModule} from "@angular/router";
import {Order} from "../Model/order";

@Injectable({providedIn: 'root'})
export class OrderService {
  //members
  deliverySelected: boolean;
  pickUpSelected: boolean;
  addressCompleted: boolean;
  orderInProgress: boolean;
  orderValidated: boolean;
  order: Order;

  //constructor
  constructor(private http: HttpClient,
              private router: Router) {
    this.deliverySelected = false;
    this.pickUpSelected = false;
    this.addressCompleted = false;
    this.orderInProgress = false;
    this.orderValidated = false;
    this.order = new Order();
  }


  //methods
  validateOrder(deliveryType: string): Observable<any> {
    return this.http.post(environment.baseUrl + environment.order, deliveryType,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  getOrderById(id: string | null): Observable<any>{
    return this.http.get(environment.baseUrl+environment.getOrderById+ "?id=" + id);
  }

  deleteOrder(id: string | null): Observable<any> {
    return this.http.post(environment.baseUrl + environment.deleteOrder, id,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  changeOrderStatusToPayed(orderId: string| null): Observable<any>{
    return this.http.post(environment.baseUrl + environment.changeOrderStatusToPayed, orderId,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  getOrdersByUserId(): Observable<any>{
    return this.http.get(environment.baseUrl+environment.getOrdersByUserId);
  }

  getAllOrders(): Observable<any>{
    return this.http.get(environment.baseUrl+environment.getAllOrders);
  }

  orderNextStatus(orderId: string| null): Observable<any>{
    return this.http.post(environment.baseUrl + environment.orderNextStatus, orderId,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }





}
