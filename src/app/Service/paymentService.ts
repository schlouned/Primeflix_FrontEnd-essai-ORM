import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Payment} from "../Model/payment";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class PaymentService {
  //members
  creditCardSelected: boolean;
  payPalSelected: boolean;
  paymentMade: boolean;

  //constructor
  constructor(private http: HttpClient,
              private router: Router) {
    this.creditCardSelected = false;
    this.payPalSelected = false;
    this.paymentMade = false;
  }

  //methods
  //*********
  //stripe
  chargeCard(token: string, orderId: string | null): Observable<any> {
    //create payment object
    let payment = new Payment();
    payment.token = token;
    if (orderId != null) {
      payment.orderId = orderId;
    }
    //call the backend api
    return this.http.post(environment.baseUrl + environment.stripePaymentCharge, JSON.stringify(payment),
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  //paypal
  makePayment(orderId: string | null): Observable<any> {
    return this.http.post(environment.baseUrl + `/paypalPayment/make/payment?orderId=${orderId}`, {});
  }

  completePayment(paymentId: string, payerId: string): Observable<any> {
    return this.http.post(environment.baseUrl + `/paypalPayment/complete/payment?paymentId=${paymentId}&payerId=${payerId}`, {});
  }

  //open a paypal window
  openPaypalWindow(url: string){
    window.location.assign(url);
  }

}
