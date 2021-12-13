import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Discount} from "../Model/discount";
import {CartItem} from "../Model/cartItem";

@Injectable({providedIn: 'root'})
export class CartService {
  //members

  //constructor
  constructor(private http: HttpClient) {
  }

  //methods
  //add to cart
  addToCart(movieId: string): Observable<any> {
    return this.http.post(environment.baseUrl + environment.addToCart, movieId,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  //getCart
  getCart(): Observable<any> {
    return this.http.get(environment.baseUrl + environment.getCart);
  }

  //modifyQuantity
  modifyQuantity(cartItem: CartItem): Observable<any> {
    return this.http.post(environment.baseUrl + environment.updateCartItem, cartItem,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  deleteCartItem(cartItem: CartItem): Observable<any> {
    return this.http.post(environment.baseUrl + environment.deleteCartItem, cartItem,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }


}
