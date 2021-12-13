// use to recover iso code
import {AlertService} from "../../Service/alert.service";

declare var require: any;
//
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../../Service/account.service";
import {Country, MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {User} from "../../Model/user";
import {Address} from "../../Model/address";
import {translate} from 'ngx-bootstrap-icons';
import {TranslateService} from "@ngx-translate/core";
import {OrderComponent} from "../order/order.component";
import {OrderService} from "../../Service/order.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  //members
  form: FormGroup;
  countryFormControl = new FormControl();
  orderInProgress: Boolean;
  addressCompleted: Boolean;
  //variable to know if the form was submitted
  submitted = false;

  // convenience getter for easy access to form component in html side
  get f() {
    return this.form.controls;
  }

  //constructor
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private accountService: AccountService,
              private alertService: AlertService,
              private translate: TranslateService,
              public orderService: OrderService) {
    //init orderInProgress
    this.orderInProgress = orderService.orderInProgress;
    this.addressCompleted = false;
    //init form
    this.form = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
      street: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
      houseNumber: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
      zipCode: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
      countryCode: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]]
    });
  }

  //init
  ngOnInit(): void {
    //on init recover user informations
    this.getUserInformations();
    this.orderInProgress = this.orderService.orderInProgress;
    console.log("from account component order in progress status just read = " + this.orderService.orderInProgress);
  }

  ngOnDestroy(): void {
    this.orderInProgress = false;
  }

  //update user informations
  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //prepare the object
    let address = new Address();
    address.street = this.form.value.street;
    address.houseNumber = this.form.value.houseNumber;
    address.zipCode = this.form.value.zipCode;
    address.city = this.form.value.city;
    address.countryCode = this.convertCountryInCountryCode();

    let user = new User();
    user.email = <string>sessionStorage.getItem('email');
    user.firstName = this.form.value.firstName;
    user.lastName = this.form.value.lastName;
    user.address = address;

    //update user(send to backend)
    this.accountService.updateUserInformations(user).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "USER_INFO_UPDATED") {
            this.alertService.success(this.translate.instant('UserAccountUpdated'));
            //refresh component
            this.ngOnInit();

          }
        }
      },
      err => {
        if (err.error.alertCode == "USER_NOT_EXIST")
          this.alertService.error(this.translate.instant('UserDontExist'));
        else
          this.alertService.error(this.translate.instant('ErrorOccurDuringUpdateUserAccountInfo'));
      });
  }

  //get user informations
  getUserInformations() {
    this.accountService.getUserInformations().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "USER_INFO_OK") {
          this.form = this.formBuilder.group({
            lastName: [res.map.lastName, [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
            firstName: [res.map.firstName, [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
            street: [res.map.street, [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
            houseNumber: [res.map.houseNumber, [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
            zipCode: [res.map.zipCode, [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]],
            city: [res.map.city, [Validators.required, Validators.pattern('[a-zA-Z0-9 -]*')]]
          });
          this.countryFormControl.setValue(this.convertCountryCodeInCountry(res.map.countryCode));
          //check if address is completed
          this.checkIfAddressCompleted();
        }
      }
    }, err => {
      if (err.error.alertCode == "USER_NOT_EXIST")
        this.alertService.error(this.translate.instant('UserDontExist'));
      else
        this.alertService.error(this.translate.instant('ErrorOccurDuringGettingUserAccountInfo'));
    });
  }

  //convert country in country code
  convertCountryInCountryCode() {
    let countryCode: string;
    countryCode = this.countryFormControl.value.alpha2Code;
    console.log(countryCode);
    return countryCode;
  }

  //convert country code in country
  convertCountryCodeInCountry(alpha2Code: string) {
    return this.buildCountry(alpha2Code);

  }

  buildCountry(alpha2: string) {
    const iso = require('iso-3166-1');
    let country;
    country = iso.whereAlpha2(alpha2);
    console.log(country);
    //convert to countryformat
    let name = country.country;
    let alpha3 = country.alpha3;
    let numeric = country.numeric;
    let calling = "***";

    let countryReturn = {
      name: name,
      alpha2Code: alpha2,
      alpha3Code: '***',
      numericCode: '***',
      callingCode: '***'
    }

    return countryReturn;
  }

  //next step order
  validateOrder() {
    this.form.value.this.orderService.validatOrder();
  }

  checkIfAddressCompleted() {
    if (this.form.valid)
      this.addressCompleted = true;
    else
      this.addressCompleted = false;
  }

  goBackToOrder() {
    this.router.navigate(['/order']);
  }

}
