import {Component, OnInit} from '@angular/core';
import {Cart} from "../../Model/cart";
import {CartService} from "../../Service/cart.service";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../Service/alert.service";
import {CartItem} from "../../Model/cartItem";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //members
  cart!: Cart;
  language!: string;

  //constructor
  constructor(private cartService: CartService,
              private translate: TranslateService,
              private alertService: AlertService,
              private router: Router) {
  }


  //on init
  ngOnInit(): void {
    this.language = this.translate.currentLang;
    this.getCart();
  }

  //methods
  getCart() {
    this.cartService.getCart().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "GET_CART_SUCCESS") {
          this.cart = res.cart;
          this.cart.cartItems = this.cart.cartItems.sort((first, second)=>0-(first.movie.titleEn>second.movie.titleEn?-1:1));
        }
      }
    }, err => {
      if (err.error.alertCode == "GET_CART_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringGettingCart'));
    });
  }

  calculatePriceWithDiscount(cartItem: CartItem): string {
    //members
    let percentage: number;
    let ratio: number;
    let netPrice: number;
    let roundNetPrice: string;
    //recover the percentage and cast in number
    if(cartItem.movie.category.discount != null) {
      percentage = Number(cartItem.movie.category.discount.percentage);
      //calculate the ratio
      ratio = (100 - percentage) / 100;
      //calculate net price;
      netPrice = Number(cartItem.movie.price) * ratio;
    }
    else{
      netPrice = (Number(cartItem.movie.price));
    }
    //round
    roundNetPrice = netPrice.toFixed(2);
    //return
    return roundNetPrice;
  }

  calculateSubTotalPrice(cartItem: CartItem): string{
    //members
    let netPrice: number;
    let subTotalPrice: number;
    let roundSubTotalPrice: string;
    //calculate real price * qte
    netPrice = Number(this.calculatePriceWithDiscount(cartItem));
    subTotalPrice = netPrice * Number(cartItem.quantity);
    //round
    roundSubTotalPrice = subTotalPrice.toFixed(2);
    //return
    return roundSubTotalPrice;
  }

  increaseQuantity(cartItem: CartItem){
    //recover quantity and parse in Number
    let quantity = Number(cartItem.quantity);
    //recover stock quantity
    let stockQuantity = Number(cartItem.movie.stockQuantity);
    //never upper stock quantity
    if(quantity < stockQuantity) {
      //increase by 1
      quantity += 1;
      //set to the cartItem
      cartItem.quantity = quantity;

      //update in backend
      this.modifyQuantity(cartItem);
    }

  }

  decreaseQuantity(cartItem: CartItem){
    //recover quantity and parse in Number
    let quantity = Number(cartItem.quantity);
    //never under 1
    if(quantity >1) {
      //decrease by 1
      quantity -= 1;
      //set to the cartItem
      cartItem.quantity = quantity;
      //update in backend
      this.modifyQuantity(cartItem);
    }

  }

  modifyQuantity(cartItem: CartItem) {
    this.cartService.modifyQuantity(cartItem).subscribe(res => {
      if (res.status == "200") {
        if (res.message == "CARTITEM_UPDATE_SUCCESS") {
          //this.alertService.success(this.translate.instant('CartItemSuccessfullyUpdated'));
          this.ngOnInit();
        }
      }
      if (res.status == "400") {
        if (res.alertObject.alertCode == "CARTITEM_UPDATE_STOCK_ERROR") {
          this.alertService.error(this.translate.instant('CartItemUpdateStockError'));
          this.ngOnInit();
        }
      }
    }, err => {
      if (err.error.alertCode == "CARTITEM_UPDATE_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringUpdatingCartItem'));
    });
  }

  deleteCartItem(cartItem: CartItem) {
    this.cartService.deleteCartItem(cartItem).subscribe(res => {
      if (res.status == "200") {
        if (res.message == "CARTITEM_DELETED_SUCCESS") {
          //this.alertService.success(this.translate.instant('CartItemSuccessfullyDeleted'));
          this.ngOnInit();
        }
      }
    }, err => {
      if (err.error.alertCode == "CARTITEM_DELETED_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringDeletingCartItem'));
    });
  }

  continueShopping(){
    this.router.navigate(['/movie']);
  }

  calculateTotal(): string{
    //members
    let subTotal = 0;
    let total = 0;
    let roundTotal;
    for(let i=0; i<this.cart.cartItems.length; i++){
      subTotal = Number(this.calculateSubTotalPrice(this.cart.cartItems[i]));
      total += subTotal;
    }
    //round
    roundTotal = total.toFixed(2);
    //return
    return roundTotal;
  }

  order(){
    this.router.navigate(['/order']);
  }

  ckeckIfCartEmpty(): boolean{
    if(this.cart.cartItems.length == 0)
      return true;
    else
      return false;
  }
}
