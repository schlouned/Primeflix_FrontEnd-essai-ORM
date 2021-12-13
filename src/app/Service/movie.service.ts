import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../Model/user";

@Injectable({providedIn: 'root'})
export class MovieService {
  //members
  searchBool: boolean;
  searchText: string;

  //constructor
  constructor(private router: Router, private http: HttpClient) {
    this.searchBool = false;
    this.searchText = "";
  }

  //methods
  //get all movies
  getAllMovies(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + environment.getAllMovies);
  }

  //get movies by category
  getMoviesByCategory(filter: string): Observable<any> {
    return this.http.get<any>(environment.baseUrl + environment.getMoviesByCategory + "?filter=" + filter);
  }

  //get movies with filter
  getMoviesFilter(filter: string, language: string): Observable<any> {
    return this.http.get<any>(environment.baseUrl + environment.getMoviesFilter + "?filter=" + filter+"&language=" + language);
  }

  //reload component after enter a search word
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //*******************************************************************************
  //util
  //*******************************************************************************

}
