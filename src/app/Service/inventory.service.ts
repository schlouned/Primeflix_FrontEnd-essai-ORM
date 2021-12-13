import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CartItem} from "../Model/cartItem";
import {environment} from "../../environments/environment";
import {Inventory} from "../Model/inventory";

@Injectable({providedIn: 'root'})
export class InventoryService {
  //members

  //constructor
  constructor(private http: HttpClient) {
  }

  //method
  saveInventory(inventory: Inventory): Observable<any> {
    return this.http.post(environment.baseUrl+environment.inventory, inventory,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  getInventories(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + environment.getInventories);
  }

}
