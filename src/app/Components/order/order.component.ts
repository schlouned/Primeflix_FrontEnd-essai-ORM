import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from "../../Model/cart";
import {AccountService} from "../../Service/account.service";
import {OrderService} from "../../Service/order.service";
import {Validators} from "@angular/forms";
import {AccountComponent} from "../account/account.component";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {Order} from "../../Model/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  //members
  companyName: string;
  lastName: string;
  firstName: string;
  companyStreet: string;
  companyHouseNumber: string;
  companyZipCode: string;
  companyCity: string;
  companyCountry: string;
  userStreet: string;
  userHouseNumber: string;
  userZipCode: string;
  userCity: string;
  userCountry: string;
  language!: string;


  //constructor
  constructor(private accountService: AccountService,
              private alertService: AlertService,
              private translate: TranslateService,
              public orderService: OrderService,
              private router: Router) {
    this.companyName = '';
    this.lastName = '';
    this.firstName = '';
    this.companyStreet = '';
    this.companyHouseNumber = '';
    this.companyZipCode = '';
    this.companyCity = '';
    this.companyCountry = '';
    this.userStreet = '';
    this.userHouseNumber = '';
    this.userZipCode = '';
    this.userCity = '';
    this.userCountry = '';
  }

  //methods
  ngOnInit() {
    this.orderService.deliverySelected = false;
    this.orderService.pickUpSelected = false;
    this.orderService.orderInProgress = true;
    console.log("from order component order in progress status just write = " + this.orderService.orderInProgress);
    this.getUserAddress();
    this.getStoreAddress();
    this.language = this.translate.currentLang;
  }

  ngOnDestroy() {
    this.orderService.addressCompleted = false;
  }

  delivery() {
    //set bit
    if (this.orderService.deliverySelected == false) {
      this.orderService.deliverySelected = true;
      if (this.lastName != null && this.firstName != null
        && this.userStreet != null && this.userHouseNumber != null
        && this.userZipCode != null && this.userCity != null
        && this.userCountry != null)
        this.orderService.addressCompleted = true;
    } else {
      this.orderService.deliverySelected = false;
      this.orderService.addressCompleted = false;
    }

  }

  pickUp() {
    //set bit
    if (this.orderService.pickUpSelected == false) {
      this.orderService.pickUpSelected = true;
      if (this.companyName != null
        && this.companyStreet != null && this.companyHouseNumber != null
        && this.companyZipCode != null && this.companyCity != null
        && this.companyCountry != null)
        this.orderService.addressCompleted = true;

    } else {
      this.orderService.pickUpSelected = false;
      this.orderService.addressCompleted = false;
    }

  }

  getStoreAddress() {
    this.accountService.getStoreAddress().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "GET_COMPANY_SUCCESS") {
          this.companyName = res.map.companyName;
          this.companyStreet = res.map.street;
          this.companyHouseNumber = res.map.houseNumber;
          this.companyZipCode = res.map.zipCode;
          this.companyCity = res.map.city;
          this.companyCountry = res.map.countryCode;
        }
      }
    }, err => {
      if (err.error.alertCode == "USER_NOT_EXIST")
        this.alertService.error(this.translate.instant('UserDontExist'));
      else (err.error.alertCode == "GET_STORE_ERROR")
      this.alertService.error(this.translate.instant('GetStoreError'));
    });
  }

  validateOrder() {
    let deliveryType = '';
    if (this.orderService.deliverySelected) {
      deliveryType = environment.delivery;
    } else if (this.orderService.pickUpSelected) {
      deliveryType = environment.pickup;
    }

    this.orderService.validateOrder(deliveryType).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "ORDER_SUCCESS") {
            this.alertService.success(this.translate.instant('OrderValidationSuccess'));
            this.orderService.orderInProgress = false;
            this.orderService.orderValidated = true;
            //save order in session
            sessionStorage.setItem("currentOrderId", res.orderDto.id);
            //go to order validated page
            this.router.navigate(['/order-validated']);
          }
        }
      },
      err => {
        if (err.error.alertCode == "ORDER_ERROR")
          this.alertService.error(this.translate.instant('OrderValidationError'));
        if (err.error.alertCode == "ADDRESS_DONT_EXIST") {
          this.router.navigate(['/account']);
          this.alertService.error(this.translate.instant('DeliveryAddressDontExist'));
        }
        if (err.error.alertCode == "STOCK_0") {
          this.router.navigate(['/cart']);
          this.alertService.error(this.translate.instant('STOCK_0'));
        }
      });
  }

  getUserAddress() {
    this.accountService.getUserInformations().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "USER_INFO_OK") {
          this.lastName = res.map.lastName;
          this.firstName = res.map.firstName;
          this.userStreet = res.map.street;
          this.userHouseNumber = res.map.houseNumber;
          this.userZipCode = res.map.zipCode;
          this.userCity = res.map.city;
          this.userCountry = res.map.countryCode;
        }
      }
    }, err => {
      if (err.error.alertCode == "USER_NOT_EXIST")
        this.alertService.error(this.translate.instant('UserDontExist'));
      else
        this.alertService.error(this.translate.instant('ErrorOccurDuringGettingUserAccountInfo'));
    });
  }

}
