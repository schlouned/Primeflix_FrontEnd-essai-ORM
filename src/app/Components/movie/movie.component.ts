import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {OwlOptions} from "ngx-owl-carousel-o";
import {MovieService} from "../../Service/movie.service";
import {Validators} from "@angular/forms";
import {AlertService} from "../../Service/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {NavigationComponent} from "../navigation/navigation.component";
import {Router} from "@angular/router";
import {Movie} from "../../Model/movie";
import {MovieItemService} from "../../Service/movieItem.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  //members
  language!: any;
  actionMovies: any = [];
  dramaMovies: any = [];
  thrillerMovies: any = [];
  filterMovies: any = [];
  search!: boolean;
  discountAction: number = 0;
  discountDrama: number = 0;
  discountThriller: number = 0;

  //constructor
  constructor(private movieService: MovieService,
              private alertService: AlertService,
              private translate: TranslateService,
              private movieItemService: MovieItemService) {
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit() {
    if (this.movieService.searchBool == false) {
      this.search = false;
      this.getMoviesByCategory("action", this.actionMovies);
      this.getMoviesByCategory("drama", this.dramaMovies);
      this.getMoviesByCategory("thriller", this.thrillerMovies);
    } else {
      this.search = true;
      this.getMoviesFilter()
    }
    this.language= this.translate.currentLang;


  }

  ngOnDestroy() {
    this.actionMovies = [];
    this.dramaMovies = [];
    this.thrillerMovies = [];
    this.filterMovies = [];
  }

  //get all movies
  getAllMovies() {
    this.movieService.getAllMovies().subscribe(res => {
      if (res.status == "200") {
        if (res.message == "MOVIES_GETALL_SUCCESS") {
          for (let movie of res.movies) {
            this.actionMovies.push(movie);
          }
        }
      }
    }, err => {
      if (err.error.alertCode == "MOVIES_GETALL_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringGettingAllMovies'));
    });
  }

  //get movies by category
  getMoviesByCategory(category: string, movies: any[]) {
    this.movieService.getMoviesByCategory(category).subscribe(res => {
      if (res.status == "200") {
        if (res.message == "MOVIES_GETMOVIECATEGORY_SUCCESS") {
          for (let movie of res.movies) {
            movies.push(movie);
          }
          this.checkIfDiscount(movies);
        }
      }
    }, err => {
      if (err.error.alertCode == "MOVIES_GETMOVIECATEGORY_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringGettingMoviesByCategory'));
    });
  }

  //get movies with filter
  getMoviesFilter() {
    this.movieService.getMoviesFilter(this.movieService.searchText, this.translate.currentLang).subscribe(res => {
      if (res.status == "200") {
        if (res.message == "MOVIES_GETFILTER_SUCCESS") {
          //reload movies according to filter
          for (let movie of res.movies) {
            this.filterMovies.push(movie);
          }
        }
      }
    }, err => {
      if (err.error.alertCode == "MOVIES_GETFILTER_ERROR")
        this.alertService.error(this.translate.instant('ErrorOccurDuringGettingMoviesByFilter"'));
    })
  }

  //open movie
  openMovieProfile(movie: Movie){
    this.movieItemService.openMovieProfile(movie);

  }

  //check if discount
  checkIfDiscount(movies: Movie[]){
    //discount?
    if(movies[0].category.discount.category.id == "1"){
      this.discountAction = this.actionMovies[0].category.discount.percentage;
    }
    if(movies[0].category.discount.category.id == "3"){
      this.discountDrama = this.dramaMovies[0].category.discount.percentage;
    }
    if(movies[0].category.discount.category.id == "8"){
      this.discountThriller = this.thrillerMovies[0].category.discount.percentage;
    }
  }

}
