import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../Service/account.service";
import {Router} from "@angular/router";
//internationalization
import {TranslateService} from '@ngx-translate/core';
import {interval, observable, Observable, Subscription} from "rxjs";
import {AlertService} from "../../Service/alert.service";
import {FormGroup} from "@angular/forms";
import {MovieService} from "../../Service/movie.service";
import {MovieComponent} from "../movie/movie.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  //members
  language!: any;
  searchText!: string;
  @Input() _loggedType: string;
  public isMenuCollapsed = true;
  public loggedAsClient = false;
  public loggedAsStorekeeper = false;
  public loggedAsMarketingManager = false;
  public loggedAsAdmin = false;
  public userTypeSubscription: Subscription;
  @Input() email: string;
  //searchBool : boolean;

  //constructor
  constructor(private accountService: AccountService,
              private route: Router,
              public translate: TranslateService,
              private alertService: AlertService,
              private movieService: MovieService) {
    //init variable
    this._loggedType = "";
    this.userTypeSubscription = new Subscription();
    this.email = "";

    //i18n internationalization
    //declare the different languages
    translate.addLangs(['en', 'fr']);
    //set default language
    translate.setDefaultLang('en');
  }

  //methods
  ngOnInit(): void {
    //set default language
    this.translate.currentLang="en";
    //emit information
    this.accountService.emitUserTypeSubject();

    console.log("********************************************************");
    console.log("login properties: ")
    console.log("-------------------------------------");
    console.log("authetication type: " + this.accountService.getAuthRole());
    console.log("token: " + this.accountService.getToken());
    console.log("********************************************************");

    //user subscription: use to know what kind of user is logged
    this.userTypeSubscription = this.accountService.userTypeSubject.subscribe((userType) => {
      this._loggedType = userType.getItem("auth_type");
      this.email = userType.getItem("auth_email");
      //set boolean access for the application
      if (this._loggedType == "client") {
        this.loggedAsClient = true;
      } else if (this._loggedType == "storekeeper") {
        this.loggedAsStorekeeper = true;
      } else if (this._loggedType == "marketingManager") {
        this.loggedAsMarketingManager = true;
      } else if (this._loggedType == "admin") {
        this.loggedAsAdmin = true;
      }
    });
    //emit information
    this.accountService.emitUserTypeSubject();
  }

  ngOnDestroy() {
    this.userTypeSubscription.unsubscribe();
  }

  logout() {

    this.accountService.logout().subscribe(res => {
        if (res.status == "200") {
          if (res.message == "SUCCESS") {
            this.route.navigate(['/login']);
            this.alertService.success(this.translate.instant('LogoutSuccessfull'));
            this.loggedAsClient = false;
            this.loggedAsStorekeeper = false;
            this.loggedAsMarketingManager = false;
            this.loggedAsAdmin = false;
            //if you want to test that someone recover the token comment the line below and the line 94
            this.accountService.removeToken();
          }
        }
      },
      err => {
        this.route.navigate(['/login']);
        this.alertService.error(this.translate.instant('ErrorOccurDuringLoggedOut'));
      });
    //in case if token is expired
    this.accountService.removeToken();
    //emit user information
    this.accountService.emitUserTypeSubject();
    //delete session storage
    sessionStorage.clear();
  }

  //i18n internationalization
  switchLang(lang: string) {
    this.translate.use(lang);
    //save the language in the selected session
    sessionStorage.setItem("language", lang);
  }

//search movies
  search() {
    if(this.searchText == ""){
      this.movieService.searchBool = false;
    }
    else {
      this.movieService.searchText = this.searchText;
      this.movieService.searchBool = true;
    }
    this.movieService.reloadComponent();
  }



}
