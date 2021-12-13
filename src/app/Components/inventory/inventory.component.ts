import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../../Service/account.service";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {OrderService} from "../../Service/order.service";
import {InventoryService} from "../../Service/inventory.service";
import {Address} from "../../Model/address";
import {User} from "../../Model/user";
import {Inventory} from "../../Model/inventory";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  //members
  form: FormGroup;

  //variable to know if the form was submitted
  submitted = false;

  // convenience getter for easy access to form component in html side
  get f() {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private translate: TranslateService,
              private inventoryService: InventoryService) {
    //init form
    this.form = this.formBuilder.group({
      movieId: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      stockAfterInventory: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  ngOnInit(): void {
  }

  //methods
  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //prepare the object
    let inventory = new Inventory();
    inventory.movieId = this.form.value.movieId;
    inventory.stockAfterInventory = this.form.value.stockAfterInventory;

    //save the inventory item
    this.inventoryService.saveInventory(inventory).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "INVENTORY_SAVED_SUCCESS"){
            this.alertService.success(this.translate.instant('InventorySuccessfullySaved'));
            //refresh component
            this.ngOnInit();
          }
        }
      },
      err => {
        if (err.error.alertCode == "USER_NOT_EXIST")
          this.alertService.error(this.translate.instant('UserDontExist'));
        else
          this.alertService.error(this.translate.instant('ErrorOccurDuringSavingInventory'));
      });

  }

}
