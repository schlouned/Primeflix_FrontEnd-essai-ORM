import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../Model/user";
import {UserService} from "../../Service/user.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {Address} from "../../Model/address";
import {Discount} from "../../Model/discount";
import {DiscountService} from "../../Service/discount.service";
import {Category} from "../../Model/category";

@Component({
  selector: 'app-discount-crud',
  templateUrl: './discount-crud.component.html',
  styleUrls: ['./discount-crud.component.css']
})
export class DiscountCrudComponent implements OnInit {
  //members
  form: FormGroup;
  discounts: any[] = [];
  isupdated = false;
  discountList: any[] = [];
  discountSelected: Discount = new Discount();
  closeModal!: string;
  newDiscount: Discount = new Discount();
  categories: any = [];

  //constructor
  constructor(private discountService: DiscountService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private translate: TranslateService) {
    this.form = this.formBuilder.group({
      category: [''],
      percentage: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  //methods
  ngOnInit(): void {
    this.isupdated = false;
    this.getDiscounts();
    this.getCategories(this.categories);
  }


  updateDiscount(discount: Discount, content: any) {
    this.discountSelected = discount;
    this.form = this.formBuilder.group({
      category: [discount.category.name],
      percentage: [discount.percentage],
      startDate: [discount.startDate],
      endDate: [discount.endDate],
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDiscounts() {
    this.discountService.getDiscounts().subscribe(res => {
        this.discounts = res.discounts;
      },
      err => {
        this.alertService.error(this.translate.instant('CrudError'));
        console.log(err);
      });
  }

  onSubmit() {
    //prepare the object
    let discount = new Discount();
    discount.id = this.discountSelected.id;
    discount.category = this.recoverCategoryByName(this.form.value.category);
    discount.percentage= this.form.value.percentage;
    discount.startDate = this.form.value.startDate;
    discount.endDate = this.form.value.endDate;

    this.discountService.saveDiscount(discount).subscribe(
      res => {
        this.alertService.success(this.translate.instant('CrudSuccess'));
        //refresh component
        this.ngOnInit();
        this.isupdated = true;
      },
      err => {
        this.alertService.error(this.translate.instant('CrudError'));
        console.log(err);
      });
  }

  deleteDiscount(discount: Discount) {
    this.discountService.deleteDiscount(discount)
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


  //************************
  //get categories
  getCategories(categories: any[]) {
    this.discountService.getCategories().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "GET_CATEGORY_SUCCESS") {
          for (let category of res.categories) {
            categories.push(category);
          }
        }
      }
    }, err => {
      if (err.error.alertCode == "GET_CATEGORY_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringRecoveringCategories'));
    });
  }

  //recover the right category
  recoverCategoryByName(name: string): Category | any {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name == name) {
        return this.categories[i];
      }
    }
  }


}
