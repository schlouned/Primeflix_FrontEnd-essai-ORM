import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../Service/order.service";
import {OrderList} from "../../Model/orderList";
import {AlertService} from "../../Service/alert.service";
import {Order} from "../../Model/order";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  //members
  allowed!: boolean;
  orders!: Order[];
  //constructor
  constructor(private orderService: OrderService,
              private  translate: TranslateService,
              private http: HttpClient,
              private alertService: AlertService) {

  }

  //methods
  ngOnInit(): void {

    if(sessionStorage.getItem("auth_type")=="admin" || sessionStorage.getItem("auth_type")=="storekeeper"){
      this.allowed = true;
      this.getAllOrders();
    }
    if(sessionStorage.getItem("auth_type")=="client"){
      this.getOrdersByUserId();
    }
  }

  getOrdersByUserId() {
    this.orderService.getOrdersByUserId().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "GET_ORDER_SUCCESS") {
          this.orders = res.orders;
        }
      }
    }, err => {
      if (err.error.alertCode == "GET_ORDER_ERROR")
        this.alertService.error(this.translate.instant('GetOrderError'));
    });
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "GET_ORDER_SUCCESS") {
          this.orders = res.orders;
        }
      }
    }, err => {
      if (err.error.alertCode == "GET_ORDER_ERROR")
        this.alertService.error(this.translate.instant('GetOrderError'));
    });
  }

  orderNextStatus(orderId: string) {
    this.orderService.orderNextStatus(orderId).subscribe(res => {
      if (res.status == "200") {
        if (res.message == "ORDER_STATUS_CHANGED_SUCCESS") {
          this.alertService.success(this.translate.instant('OrderStatusSuccessfullyChanged'));
          this.ngOnInit();
        }
      }
    }, err => {
      if (err.error.alertCode == "ORDER_STATUS_CHANGED_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringChangingOrderStatus'));
    });
  }



}
