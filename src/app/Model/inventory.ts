import {Movie} from "./movie";


export class Inventory {
  //members
  id: string;
  movie: Movie;
  movieId: string;
  date: Date;
  stockBeforeInventory: string;
  stockAfterInventory: string;
  difference: string;

  //constructor
  constructor() {
    this.id = '';
    this.movie = new Movie();
    this.movieId = '';
    this.date = new Date();
    this.stockBeforeInventory = '';
    this.stockAfterInventory = '';
    this.difference = '';

  }


}
