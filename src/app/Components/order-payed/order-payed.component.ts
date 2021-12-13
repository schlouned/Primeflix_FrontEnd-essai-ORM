import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../Service/paymentService";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../Service/alert.service";
import {OrderService} from "../../Service/order.service";

@Component({
  selector: 'app-order-payed',
  templateUrl: './order-payed.component.html',
  styleUrls: ['./order-payed.component.css']
})
export class OrderPayedComponent implements OnInit {

  constructor(private paymentService: PaymentService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private translate: TranslateService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    //recover url parameters
    let url = this.router.url;
    let paymentId = '';
    let payerId = '';
    console.log("returnedUrl: " + url);

    this.route.queryParams.subscribe(params => {
      paymentId = params['paymentId'];
      payerId = params['PayerID'];
      console.log("params: " + paymentId + " " + payerId);
    });

    //call the last method if this is paypal payment method
    if (paymentId !== undefined && payerId !== undefined) {
      const pro = this.promise_paypalComplete_step_1(paymentId, payerId)
        .then(() => this.promise_paypalComplete_step_2())
        .then(() => this.alertService.success(this.translate.instant('PaymentSuccessful')))
        .catch(error => {
          this.alertService.error(this.translate.instant(error.toString()));
        });
    }
  }

  promise_paypalComplete_step_1(paymentId: string, payerId: string) {
    return new Promise<string>((resolve, reject) => {
      this.paymentService.completePayment(paymentId, payerId).subscribe(
        res => {
          resolve('ok');
        }
        , err => {
          reject(err.message);
        });
    })
  }

  promise_paypalComplete_step_2() {
    return new Promise<string>((resolve, reject) => {
      this.orderService.changeOrderStatusToPayed(sessionStorage.getItem('currentOrderId')).subscribe(res => {
          if (res.status == "200") {
            if (res.message == "ORDER_STATUS_PAYED_SUCCESS") {
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

}
