import {Movie} from "./movie";
import {Cart} from "./cart";

export class CartItem {
  id: string;
  date: Date;
  quantity: number;
  movie: Movie;
  cart: Cart;


  constructor() {
    this.id = '';
    this.date = new Date();
    this.quantity = 0;
    this.movie = new Movie();
    this. cart = new Cart();
  }
}
