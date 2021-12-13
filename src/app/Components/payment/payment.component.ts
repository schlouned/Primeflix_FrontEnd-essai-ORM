import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../Service/paymentService";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {OrderService} from "../../Service/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  //members

  //constructor
  constructor(public paymentService: PaymentService,
              private http: HttpClient,
              private alertService: AlertService,
              private translate: TranslateService,
              private orderService: OrderService,
              private router: Router) {

  }

  //methods
  ngOnInit(): void {
    this.paymentService.creditCardSelected = false;
    this.paymentService.payPalSelected = false;
  }

  creditCard() {
    //set bit
    if (this.paymentService.creditCardSelected == false) {
      this.paymentService.creditCardSelected = true;
    } else {
      this.paymentService.creditCardSelected = false;
    }
  }

  payPal() {
    //set bit
    if (this.paymentService.payPalSelected == false) {
      this.paymentService.payPalSelected = true;
    } else {
      this.paymentService.payPalSelected = false;
    }
  }

  //try to improve different call to stripe
  //first call to stripe
  promise_chargeCreditCard_step_1() {
    return new Promise<string>((resolve, reject) => {
      let form = document.getElementsByTagName("form")[0];
      //call stripe api
      (<any>window).Stripe.card.createToken({
        number: form.cardNumber.value,
        exp_month: form.expMonth.value,
        exp_year: form.expYear.value,
        cvc: form.cvc.value
      }, (status: number, response: any) => {
        if (status === 200) {
          //token returned by stripe
          let token = response.id;
          resolve(token);
        } else {
          //error when trying to have a token by stripe
          let error = response.error.message;
          reject(error);
        }
      })
    });
  }


  promise_chargeCreditCard_step_2(token: string) {
    return new Promise<string>((resolve, reject) => {
      //call the backend api
      this.paymentService.chargeCard(token, sessionStorage.getItem('currentOrderId')).subscribe(res => {
        console.log(res);
        if (res.status == "succeeded") {
          //payment successful
          //call next function
          resolve("ok");
        }
      }, err => {
        //payment error
        let errorMessage;
        if (err.error.alertCode == "STOCK_0")
          errorMessage ='STOCK_0';
        else
          errorMessage = 'PaymentError';

        reject(errorMessage);
      });
    })

  }

  promise_chargeCreditCard_step_3() {
    return new Promise<string>((resolve, reject) => {
      this.orderService.changeOrderStatusToPayed(sessionStorage.getItem('currentOrderId')).subscribe(res => {
          if (res.status == "200") {
            if (res.message == "ORDER_STATUS_PAYED_SUCCESS") {
              //this.alertService.success(this.translate.instant('PaymentSuccessful'));
              this.router.navigate(['/order-payed']);
              let successMessage = this.translate.instant('PaymentSuccessful');
              resolve(successMessage);
            }
          }
        },
        err => {
          let errorMessage = 'PaymentError';
          reject(errorMessage);
        });
    })

  }

  promise_deleteOrderAndGoBackCart(){
    return new Promise<string>((resolve, reject)=>{
      this.orderService.deleteOrder(sessionStorage.getItem('currentOrderId')).subscribe(res =>{
        if(res.status == "200"){
          this.router.navigate(['/cart']);
          resolve('ok');
        }
      }, err=>{
        reject(err.error.alertCode);
      })
    })
  }

  chargeCreditCard() {
    const pro = this.promise_chargeCreditCard_step_1()
      .then((value) => this.promise_chargeCreditCard_step_2(value)
        .then(() => this.promise_chargeCreditCard_step_3())
        .then((value) => this.alertService.success(this.translate.instant('PaymentSuccessful'))))
      .catch(err => {
        this.alertService.error(this.translate.instant(err.toString()));
        if (err == "STOCK_0") {
          this.promise_deleteOrderAndGoBackCart().then(() => this.alertService.error(this.translate.instant('STOCK_0')));
        }
        this.alertService.error(this.translate.instant('PaymentError'));
      });
  }


  //pay with paypal
  paypalPayment() {
    this.paymentService.makePayment(sessionStorage.getItem("currentOrderId")).subscribe(res => {
        //if(res.status == "200"){
        console.log("res = " + res);
        this.paymentService.openPaypalWindow(res.redirect_url);
      },
      err => {
        if (err.error.alertCode == "STOCK_0") {
          this.alertService.error(this.translate.instant('STOCK_0'));
          this.promise_deleteOrderAndGoBackCart().then(()=> this.alertService.error(this.translate.instant('STOCK_0')));
        }
        else
          this.alertService.error(this.translate.instant('PaymentError'));
      });
  }


}
