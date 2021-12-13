import {Cart} from "./cart";

export class Order {
  //members
  id: string;
  cart: Cart;
  date: Date;
  deliveryType: string;
  orderState: string;
  cartCost: number;
  deliveryCost: number;
  totalCost: number;

  //constructor
  constructor() {
    this.id = '';
    this.cart = new Cart();
    this.date = new Date();
    this.deliveryType ='';
    this.orderState='';
    this.cartCost=0;
    this.deliveryCost=0;
    this.totalCost=0;
  }

}
