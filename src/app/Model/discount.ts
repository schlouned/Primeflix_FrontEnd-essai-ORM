import {Category} from "./category";

export class Discount {
  //members
  id: string;
  category: Category;
  startDate: Date;
  endDate: Date;
  percentage: string;

  //constructor
  constructor() {
    this.id = '';
    this.category = new Category();
    this.startDate = new Date();
    this.endDate = new Date();
    this.percentage = '';
  }


}
