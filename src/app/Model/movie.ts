import {Productor} from "./productor";
import {Actor} from "./actor";
import {Category} from "./category";

export class Movie {
  id: string;
  titleEn: string;
  titlefr: string;
  productor: Productor;
  actors: Actor[];
  releaseYear: string;
  category: Category;
  pictureUrl: string;
  summaryEn: string;
  summaryFr: string;
  duration: string;
  price: string;
  stockQuantity: number;

  constructor() {
    this.id = '';
    this.titleEn = '';
    this.titlefr = '';
    this.productor = new Productor();
    this.actors = [];
    this.releaseYear = '';
    this.category = new Category();
    this.pictureUrl = '';
    this.summaryEn = '';
    this.summaryFr = '';
    this.duration = '';
    this.price = '';
    this.stockQuantity = 0;


  }
}
