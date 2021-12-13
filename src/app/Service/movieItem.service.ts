import {Injectable} from "@angular/core";
import { Movie } from "../Model/movie";
import {Router} from "@angular/router";
import {User} from "../Model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class MovieItemService {
  //members
  currentMovie!: Movie;

  //constructor
  constructor(private router: Router,
              private http: HttpClient) {
  }

  //displayMovieProfile
  openMovieProfile(movie: Movie){
    //recover the movie
    this.currentMovie = movie;
    //navigate to the page itemMovie
    this.router.navigate(['/movieItem']);
  }


}
