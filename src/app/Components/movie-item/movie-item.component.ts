import {Component, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";
import {MovieItemService} from "../../Service/movieItem.service";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../Service/alert.service";
import {CartService} from "../../Service/cart.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  //members
  movie!: Movie;
  language!: string;

  constructor(private cartService: CartService,
              private movieItemService: MovieItemService,
              private translate: TranslateService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.movie = this.movieItemService.currentMovie;
    this.language = this.translate.currentLang;
  }

  addToCart(movieId: string) {
    this.cartService.addToCart(movieId).subscribe(res => {
        if (res.status == "200") {
          if (res.message == "CART_ADD_MOVIE_SUCCESS") {
            this.alertService.success(this.translate.instant('MovieAddToCartSuccessfully'));
            //route to cart
            this.router.navigate(['/cart']);
          }
        }
        if (res.status == "400") {
          if (res.alertObject.alertCode == "CART_STOCK_0_ERROR")
            this.alertService.error(this.translate.instant('MovieAddToCartErrorStock0'));
        }
      },
      err => {
        if (err.error.alertCode == "CART_ADD_MOVIE_ERROR")
          this.alertService.error(this.translate.instant('ErrorOccurDuringAddingMovieToCart'));
      });
  }


}
