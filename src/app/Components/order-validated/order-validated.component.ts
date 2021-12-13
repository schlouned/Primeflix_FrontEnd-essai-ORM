import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/Service/order.service';
import {Order} from "../../Model/order";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../Service/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-validated',
  templateUrl: './order-validated.component.html',
  styleUrls: ['./order-validated.component.css']
})
export class OrderValidatedComponent implements OnInit {
  //members
  order: Order;
  language!: string;

  constructor(public orderService: OrderService,
              private translate: TranslateService,
              private alert: AlertService,
              private router: Router) {
    this.order = new Order();
  }

  ngOnInit(): void {
    this.getOrderById(sessionStorage.getItem("currentOrderId"));
    this.language = this.translate.currentLang;
    this.orderService.orderInProgress = false;
  }

  getOrderById(id: string | null) {
    this.orderService.getOrderById(id).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "GET_ORDER_SUCCESS") {
            this.order.cart = res.orderDto.cart;
            this.order.date = res.orderDto.date;
            this.order.cartCost = res.orderDto.cartCost.toFixed(2);
            this.order.deliveryType = res.orderDto.deliveryType;
            this.order.orderState = res.orderDto.orderState;
            this.order.deliveryCost = res.orderDto.deliveryCost.toFixed(2);
            this.order.totalCost = res.orderDto.totalCost.toFixed(2);
          }
        }
      },
      error => {
        this.alert.error(this.translate.instant('GetOrderError'));
      });
  }

  deleteOrder() {
    let id = sessionStorage.getItem("currentOrderId");
    this.orderService.deleteOrder(id).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "DELETE_ORDER_SUCCESS") {
            this.alert.success(this.translate.instant('DeleteOrderSuccess'));
            this.router.navigate(['/movie']);
          }
        }
      },
      error => {
        this.alert.error(this.translate.instant('DeleteOrderError'));
      });
  }

}
