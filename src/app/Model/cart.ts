import {User} from "./user";
import {CartItem} from "./cartItem";

export class Cart {
  id: string;
  date: Date;
  cartItems: CartItem[];
  user: User;
  totalPrice: string;


  constructor() {
    this.id = '';
    this.date = new Date();
    this.cartItems = [];
    this.user = new User();
    this.totalPrice = '';
  }
}
