import {Component, OnInit} from '@angular/core';
import {DiscountService} from "../../Service/discount.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../Service/alert.service";
import {Category} from "../../Model/category";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Address} from "../../Model/address";
import {Discount} from "../../Model/discount";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  //members
  categories: any = [];
  form!: FormGroup;
  //variable to know if the form was submitted
  submitted = false;

  // convenience getter for easy access to form component in html side
  get f() {
    return this.form.controls;
  }

  //constructor
  constructor(private discountService: DiscountService,
              private translate: TranslateService,
              private alertService: AlertService,
              private calendar: NgbCalendar,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        category: ['', [Validators.required]],
        percentage: ['', [Validators.required, Validators.pattern('[0-9]*')]]
      },
      {validator: this.dateLessThan('startDate', 'endDate')});

  }

  ngOnInit(): void {
    this.getCategories(this.categories);
  }

  //methods
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

  //on submit
  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //prepare the object
    let discount = new Discount();
    //recover the right category

    discount.category = this.recoverCategoryById(this.form.value.category);
    discount.startDate = this.form.value.startDate;
    discount.endDate = this.form.value.endDate;
    discount.percentage = this.form.value.percentage;

    //update user(send to backend)
    this.discountService.saveDiscount(discount).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "SAVE_DISCOUNT_SUCCESS")
            this.alertService.success(this.translate.instant('DiscountSaved'));
        }
        if (res.status == "400") {
          if (res.message == "OVERLAP_DISCOUNT_ERROR")
            this.alertService.error(this.translate.instant('OVERLAP_DISCOUNT_ERROR'));
        }
      },
      err => {
        if (err.error.alertCode == "SAVE_DISCOUNT_ERROR")
          this.alertService.error(this.translate.instant('ErrorOccurDuringSavingDiscount'));
      });
  }

  //validator dates
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "StartDate should be before EndDate"
        };
      }
      return {};
    }

  }

  //recover the right category
  recoverCategoryById(id: string): Category | any {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == id) {
        return this.categories[i];
      }
    }
  }
}
