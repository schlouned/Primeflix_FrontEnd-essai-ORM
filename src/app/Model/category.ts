import {Discount} from "./discount";

export class Category {
  //members
  id: string;
  name: string;
  discount!: Discount;

  //constructor
  constructor() {
    this.id='';
    this.name='';
    //this.discount = new Discount();
  }
}
