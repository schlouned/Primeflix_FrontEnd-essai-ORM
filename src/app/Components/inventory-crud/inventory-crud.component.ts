import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../Model/user";
import {UserService} from "../../Service/user.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {Address} from "../../Model/address";
import {Inventory} from "../../Model/inventory";
import {InventoryService} from "../../Service/inventory.service";

@Component({
  selector: 'app-inventory-crud',
  templateUrl: './inventory-crud.component.html',
  styleUrls: ['./inventory-crud.component.css']
})
export class InventoryCrudComponent implements OnInit {
  //members
  form: FormGroup;
  inventories: any[] = [];
  isupdated = false;
  inventoryList: any[] = [];
  inventorySelected: Inventory = new Inventory();
  closeModal!: string;
  newInventory: Inventory = new Inventory();

  //constructor
  constructor(private inventoryService: InventoryService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private translate: TranslateService) {
    this.form = this.formBuilder.group({
      movieId: [''],
      date: [''],
      stockBeforeInventory: [''],
      stockAfterInventory: [''],
      difference: [''],
    });
  }

  //methods
  ngOnInit(): void {
    this.isupdated = false;
    this.getInventories();
  }

  /*
  updateInventory(inventory: Inventory, content: any) {
    this.inventorySelected = inventory;
    this.form = this.formBuilder.group({
      movieId: [inventory.movie.id],
      date: [inventory.date],
      stockBeforeInventory: [inventory.stockBeforeInventory],
      stockAfterInventory: [inventory.stockAfterInventory],
      difference: [inventory.difference]
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
*/
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getInventories() {
    this.inventoryService.getInventories().subscribe(res => {
        this.inventories = res.inventories;
      },
      err => {
        this.alertService.error(this.translate.instant('CrudError'));
        console.log(err);
      });
  }


  onSubmit() {
    //prepare the object
   /* let address = new Address();
    address.street = this.form.value.street;
    address.houseNumber = this.form.value.houseNumber;
    address.zipCode = this.form.value.zipCode;
    address.city = this.form.value.city;
    address.countryCode = this.inventorySelected.address.countryCode;

    let user = new User();
    user.id = this.inventorySelected.id;
    user.email = this.form.value.email;
    user.firstName = this.form.value.firstName;
    user.lastName = this.form.value.lastName;
    user.role = this.form.value.role;
    user.address = address;

    this.inventoryService.saveUser(user).subscribe(
      res => {
        this.alertService.success(this.translate.instant('CrudSuccess'));
        //refresh component
        this.ngOnInit();
        this.isupdated = true;
      },
      err => {
        this.alertService.error(this.translate.instant('CrudError'));
        console.log(err);
      });*/
  }

  /*deleteUser(user: User) {
    this.userService.deleteUser(user)
      .subscribe(
        res => {
          this.alertService.success(this.translate.instant('CrudSuccess'));
          this.ngOnInit();
        },
        err => {
          console.log(err);
          this.alertService.error(this.translate.instant('CrudError'));
        });
  }
*/

}
